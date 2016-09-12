'use strict';

import { User } from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
    return User.findAll({
            attributes: [
                '_id',
                'firstname',
                'lastname',
                'phone',
                'email',
                'jurisdictionId',
                'applicationId',
                'role',
                'provider'
            ]
        })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    // var applicationId = uuid.v1();
    var newUser = User.build(req.body);
    newUser.setDataValue('provider', 'local');
    newUser.setDataValue('role', 'user');
    // newUser.setDataValue('applicationId', applicationId);
    return newUser.save()
        .then(function(user) {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({ token });
        })
        .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    return User.find({
            where: {
                _id: userId
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    return User.destroy({ _id: req.params.id })
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    console.log(userId);
    console.log(req.body);
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.find({
            where: {
                _id: userId
            }
        })
        .then(user => {

            user.password = req.body.update;
            return user.save()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));

        });
}

/**
 * Change a users forgotten password
 */
export function forgotPassword(req, res, next) {
    var email = req.body.email;
    console.log(email);
    console.log(req.body);
    var oldPass = 'test';
    var newPass = 'test';
    var N = 8;
    var newnumber = (Math.random().toString(36) + '00000000000000000').slice(2, N + 2);
    console.log(newnumber);

    return User.find({
            where: {
                email: email
            }
        })
        .then(user => {
            // console.log(user);
            user.password = newnumber;
            return user.save()
                .then(() => {
                    //Email user their new password
                    var helper = require('sendgrid').mail
                    var from_email = new helper.Email('chohorst@mtc.ca.gov')
                    var to_email = new helper.Email(email)
                    var subject = 'Password Request'
                    var content = new helper.Content('text/plain', 'Your new password is: ' + newnumber)
                    var mail = new helper.Mail(from_email, subject, to_email, content)

                    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
                    var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON()
                    });

                    sg.API(request, function(error, response) {
                        console.log(response.statusCode);
                        console.log(response.headers);
                        console.log(response.body);
                        if (response.statusCode === 202) {
                            res.json({ status: 'success' });
                        } else {
                            res.json({ status: 'error' });
                        }
                    })





                })
                .catch(validationError(res));

        });
}

/**
 * Change a users account info
 */
export function changeMyInfo(req, res, next) {
    var userId = req.user._id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var phone = req.body.phone;
    var email = req.body.email;

    return User.find({
            where: {
                _id: userId
            }
        })
        .then(user => {

            user.firstname = firstname;
            user.lastname = lastname;
            user.phone = phone;
            user.email = email;
            return user.save()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));

        });
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;

    return User.find({
            where: {
                _id: userId
            },
            attributes: [
                '_id',
                'firstname',
                'lastname',
                'email',
                'phone',
                'jurisdictionId',
                'applicationId',
                'role',
                'provider'
            ]
        })
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}
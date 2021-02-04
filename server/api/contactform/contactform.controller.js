/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contactform              ->  index
 * POST    /api/contactform              ->  create
 * GET     /api/contactform/:id          ->  show
 * PUT     /api/contactform/:id          ->  update
 * DELETE  /api/contactform/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Contactform } from '../../sqldb';
import config from '../../config/environment';
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

// console.log(sendgrid);



function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
        return entity.updateAttributes(updates)
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.destroy()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Contactforms
export function index(req, res) {
    return Contactform.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Contactform from the DB
export function show(req, res) {
    return Contactform.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Contactform in the DB
export function create(req, res) {

    var helper = require('sendgrid').mail
        // var from_email = new helper.Email(req.body.from_address, req.body.from_name);
    var from_email = new helper.Email('chohorst@mtc.ca.gov');
    var to_email = new helper.Email('mziyambi@mtc.ca.gov')
    var subject = 'P-TAP Contact Form'
    var content = new helper.Content('text/plain', 'From: ' + req.body.from_name + '   Email: ' + req.body.from_address + '    Message: ' + req.body.message)
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

}

// Updates an existing Contactform in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Contactform.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Contactform from the DB
export function destroy(req, res) {
    return Contactform.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
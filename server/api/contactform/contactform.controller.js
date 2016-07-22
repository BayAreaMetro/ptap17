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
var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.PWD);

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
    var email = new sendgrid.Email();
    console.log(req.body);
    email.addTo("mziyambi@mtc.ca.gov");
    email.setFrom(req.body.from_address);
    email.setSubject("P-TAP Contact Form");
    email.setHtml(req.body.message);

    sendgrid.send(email, function(err, json) {
        if (err) {
            console.error(err);
        }
        res.json(json);
    });

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

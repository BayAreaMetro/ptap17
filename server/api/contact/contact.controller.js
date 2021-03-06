/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contacts              ->  index
 * POST    /api/contacts              ->  create
 * GET     /api/contacts/:id          ->  show
 * PUT     /api/contacts/:id          ->  update
 * DELETE  /api/contacts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Contact } from '../../sqldb';
import uuid from 'node-uuid';

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

// Gets a list of Contacts
export function index(req, res) {
    return Contact.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Contact from the DB
export function show(req, res) {
    return Contact.find({
            where: {
                contactId: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Contact in the DB
export function create(req, res) {
    console.log(req.body);
    // If primary contact and streetsaver contact are the same, don't create a new contact
    if (!req.body.check) {
        // req.body.contactId = uuid.v1();
        console.log(req.body);
        return Contact.create(req.body)
            .then(respondWithResult(res, 201))
            .catch(handleError(res));
    }

}

// Updates an existing Contact in the DB
export function update(req, res) {
    
    return Contact.find({
            where: {
                contactId: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Contact from the DB
export function destroy(req, res) {
    return Contact.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

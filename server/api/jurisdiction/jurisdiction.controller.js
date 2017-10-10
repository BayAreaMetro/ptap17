/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/jurisdictions              ->  index
 * POST    /api/jurisdictions              ->  create
 * GET     /api/jurisdictions/:id          ->  show
 * PUT     /api/jurisdictions/:id          ->  update
 * DELETE  /api/jurisdictions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Jurisdiction } from '../../sqldb';



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

// Gets a list of Jurisdictions
export function index(req, res) {
    return Jurisdiction.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Jurisdiction from the DB
export function show(req, res) {
    return Jurisdiction.find({
            where: {
                jurisdictionId: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Jurisdiction in the DB
export function create(req, res) {
    return Jurisdiction.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Jurisdiction in the DB
export function update(req, res) {
    if (req.body.jurisdictionId) {
        delete req.body.jurisdictionId;
    }
    console.log(req.params.id);
    console.log(req.body);
    return Jurisdiction.find({
            where: {
                jurisdictionId: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Jurisdiction from the DB
export function destroy(req, res) {
    return Jurisdiction.find({
            where: {
                jurisdictionId: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

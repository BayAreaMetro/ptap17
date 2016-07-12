/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Contactform = db.sequelize.import('../api/contactform/contactform.model');
db.Contact = db.sequelize.import('../api/contact/contact.model');
db.Jurisdiction = db.sequelize.import('../api/jurisdiction/jurisdiction.model');
db.Application = db.sequelize.import('../api/application/application.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;

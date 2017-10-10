/**
 * Jurisdiction model events
 */

'use strict';

import {EventEmitter} from 'events';
var Jurisdiction = require('../../sqldb').Jurisdiction;
var JurisdictionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JurisdictionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Jurisdiction.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JurisdictionEvents.emit(event + ':' + doc._id, doc);
    JurisdictionEvents.emit(event, doc);
    done(null);
  }
}

export default JurisdictionEvents;

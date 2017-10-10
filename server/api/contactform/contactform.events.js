/**
 * Contactform model events
 */

'use strict';

import {EventEmitter} from 'events';
var Contactform = require('../../sqldb').Contactform;
var ContactformEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContactformEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contactform.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ContactformEvents.emit(event + ':' + doc._id, doc);
    ContactformEvents.emit(event, doc);
    done(null);
  }
}

export default ContactformEvents;

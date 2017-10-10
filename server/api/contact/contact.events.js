/**
 * Contact model events
 */

'use strict';

import {EventEmitter} from 'events';
var Contact = require('../../sqldb').Contact;
var ContactEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContactEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contact.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ContactEvents.emit(event + ':' + doc._id, doc);
    ContactEvents.emit(event, doc);
    done(null);
  }
}

export default ContactEvents;

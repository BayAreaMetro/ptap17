/**
 * Application model events
 */

'use strict';

import {EventEmitter} from 'events';
var Application = require('../../sqldb').Application;
var ApplicationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ApplicationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Application.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ApplicationEvents.emit(event + ':' + doc._id, doc);
    ApplicationEvents.emit(event, doc);
    done(null);
  }
}

export default ApplicationEvents;

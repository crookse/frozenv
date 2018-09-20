'use strict';

var Frozenv = require(__dirname + '/index.js');
var assert = require('assert').strict;

// Assert that an error is thrown when trying to change a frozen object's property
assert.throws(() => {
  var object = {
    status: 'I am frozen.'
  };
  Frozenv.freezeObject(object);
  object.status = 'change';
}, TypeError, "An error should be thrown when trying to change the object's properties.");

// Assert that an error is thrown when trying to change a frozen object's child object's property
assert.throws(() => {
  var parentObject = {
    status: 'I am frozen.',
    childObject: {
      status: 'I am frozen.'
    }
  };
  Frozenv.freezeObject(parentObject);
  parentObject.childObject.status = 'change';
}, TypeError, "An error should be thrown when trying to change the object's child object's properties.");

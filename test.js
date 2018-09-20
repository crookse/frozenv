'use strict';

var Frozenv = require(__dirname + '/index.js');
var assert = require('assert').strict;
var variables;

//
// Assert that environment variables are set using one namespace
//
variables = {
  some_key:'some value',
  nested_object: {
    nested_nested_object: {
      hello: 'there'
    },
    nested_nested_object_2: 'some nested value'
  }
};
Frozenv.setVars('SomeNamespace', variables);
assert.deepEqual(
  process.SomeNamespace,
  variables,
  `
Actual: ${JSON.stringify(process.SomeNamespace, null, 4)}

Expected: ${JSON.stringify(variables, null, 4)}.`
);

//
// Assert that environment variables are set using nested namepsaces
//
variables = {
  some_key:'some value',
  nested_object: {
    nested_nested_object: {
      hello: 'there'
    },
    nested_nested_object_2: 'some nested value'
  }
};
Frozenv.setVars('SomeNamespace2.SomeNestedNamespace', variables);
assert.deepEqual(
  process.SomeNamespace2.SomeNestedNamespace,
  variables,
  `
Actual: ${JSON.stringify(process.SomeNamespace2.SomeNestedNamespace, null, 4)}

Expected: ${JSON.stringify(variables, null, 4)}.`
);

//
// Assert that environment variables are merged to an existing namespace
//
var preexistingNamespace = {
  born: 'before you'
};
variables = {
  some_key:'some value',
  nested_object: {
    nested_nested_object: {
      hello: 'there'
    },
    nested_nested_object_2: 'some nested value'
  }
};
process.PreexistingNamespace = preexistingNamespace;
var expected = Object.assign(variables, preexistingNamespace);
Frozenv.setVars('PreexistingNamespace', variables);
assert.deepEqual(
  process.PreexistingNamespace,
  expected,
  `
Actual: ${JSON.stringify(process.PreexistingNamespace, null, 4)}

Expected: ${JSON.stringify(expected, null, 4)}.`
);

//
// Assert that an error is thrown when trying to change a frozen object's property
//
assert.throws(() => {
  var object = {
    status: 'I am frozen.'
  };
  Frozenv.freezeObject(object);
  object.status = 'change';
}, TypeError, "An error should be thrown when trying to change the object's properties.");

//
// Assert that an error is thrown when trying to change a frozen object's child object's property
//
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

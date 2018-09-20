module.exports.freezeObject = freezeObject;
module.exports.setVars = setVars;

/**
 * Freeze an object and all of the objects it contains
 *
 * @param {Object} object
 *     The object to freeze.
 */
function freezeObject(object) {
  for (var key in object) {
    if (typeof object[key] === 'object' && !Object.isFrozen(object[key])) {
      freezeObject(object[key]);
    }
  }
  Object.freeze(object);
}

/**
 * Set the environment variables
 *
 * @param {String} namespace
 *     The namespace to use under the `process` variable.
 * @param {Object} variables
 *     The variables to set as frozen environment variables.
 */
function setVars(namespace, variables) {
  // Create the "to-be-frozen" object that will contain unconfigurable versions of the variables
  var envVars = {};

  // Iterate through the variables and place the unconfigurable versions in the "to-be-frozen" object
  for (var key in variables) {
    envVars[key] = null;
    Object.defineProperty(envVars, key, {
      configurable: false,
      value: variables[key],
      writable: false
    });
  }

  // Create the namespace
  // This idea was taken from https://stackoverflow.com/questions/16355019/recursive-nested-property-creation-in-javascript
  var splitNamespace = namespace.split('.');
  var firstNamespace = splitNamespace[0];
  var currentNamespace = {};
  splitNamespace.forEach((key, index) => {
    // Current namespace isn't defined? Define it.
    if (!currentNamespace.hasOwnProperty(key)) {
      currentNamespace[key] = {};
    }
    // Current namespace already exists in process? Assign it.
    if (process.hasOwnProperty(key)) {
      currentNamespace[key] = Object.assign(currentNamespace[key], process[key]);
    }
    // Are we at the last namespace? Set the environment variables here. Otherwise, move on.
    if ((index + 1) === splitNamespace.length) {
      currentNamespace[key] = envVars;
    } else {
      currentNamespace = currentNamespace[key];
    }
  });

  // Now that the namespace has been defined and all of its environment variables are set, we're
  // ready to make it all available in the `process` variable.
  var namespaceValue = currentNamespace;

  // Hold up... check if the length of the namespace was only 1 namespace deep. If so, then
  // currentNamespace will be structured as...
  //
  //     { firstNamespace: {} }
  //
  // ... and it would end up in the `process` variable as process.firstNamespace.firstNamespace. To
  // prevent that, let's just clean up a bit here and target the inner namespace as the first
  // namespace. Doing this here prevents us from having to do checks in the forEach loop above.
  if (splitNamespace.length === 1) {
    namespaceValue = currentNamespace[firstNamespace];
  }

  // Set the namespace and freeze everything
  Object.defineProperty(process, firstNamespace, {
    configurable: false,
    value: namespaceValue,
    writable: false
  });
  exports.freezeObject(process[firstNamespace]);
}

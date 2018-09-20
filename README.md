# Frozenv

Node.js library that helps you set read-only environment variables under a specific namespace.

[![Frozenv npm version][badge-npm-page-img]](#)

```javascript
// Require the package
var Frozenv = require('frozenv');

// Set your environment variables
Frozenv.setVars('Cars', {
  gti: {
    make: 'Volkswagen',
    year: '2009'
  },
  cooper_s:
    make: 'Mini',
    year: '2004'
  }
});

// Access your environment variables
console.log(process.Cars.gti);
console.log(process.Cars.cooper_s);
```

## Features

* Freezes nested objects and properties
* Merges namespaces to prevent overwriting configs (including nested namespaces)

## Installation

```shell
$ cd /path/to/your/project
$ npm install --save frozenv
```

## Documentation

### Frozenv.setVars(namespace, object)

Purpose

Allows you to set read-only environment variables under a specific namespace. Any periods in the namespace name will be parsed as a nested namespace. For example, `this.is.my.namespace` will be parsed as `process.this.is.my.namespace` and not `process['this.is.my.namespace']`.

Type

`Function`

Parameters

`namespace {String}`

* The namespace to use under the `process` variable.

`{Object} variables`

* The variables to set as frozen environment variables.

Throws

Nothing

Returns

Nothing

Example

* Setting environment variables under a namespace:

    ```javascript
    // Require the package
    var Frozenv = require('frozenv');

    // Set your environment variables
    Frozenv.setVars('Cars', {
      gti: {
        make: 'Volkswagen',
        year: '2009'
      },
      cooper_s:
        make: 'Mini',
        year: '2004'
      }
    });

    // Access your environment variables
    console.log(process.Cars.gti);
    console.log(process.Cars.cooper_s);
    ```

* Setting environment variables under a nested namespace:

    ```javascript
    // Require the package
    var Frozenv = require('frozenv');

    // Define your object
    var myObject = {
      status: 'I am frozen.'
    };

    // Freeze your object
    Frozenv.freezeObject(myObject);

    // Try to change your object's property
    myObject.status = 'I have changed.';

    // Access your object's property
    console.log(myObject.status); // Outputs: 'I am frozen.'
    ```

### Frozenv.freezeObject(namespace, object)

Purpose

Allows you to freeze an object including its nested objects and properties

Type

`Function`

Parameters

`namespace {Object}`

The object to freeze.

Throws

Nothing

Returns

Nothing

Example

* Freezing an object:

    ```javascript
    // Require the package
    var Frozenv = require('frozenv');

    // Define your object
    var object = {
      status: 'I am frozen.'
    };

    // Freeze your object
    Frozenv.freezeObject(object);

    // Try to change your object's properties
    try {
      object.status = 'changed';
    } catch (error) {
      console.log(error);
    }

    // Access your object to see that nothing has changed
    console.log(object);
    ```

* Freezing an object with nested objects:

    ```javascript
    // Require the package
    var Frozenv = require('frozenv');

    // Define your object
    var object = {
      status: 'I am frozen.',
      nested_object: {
        status: 'I am frozen.',
      }
    };

    // Freeze your object
    Frozenv.freezeObject(object);

    // Try to change your object's nested object's properties
    try {
      object.nested_object.status = 'changed';
    } catch (error) {
      console.log(error);
    }

    // Access your object to see that nothing has changed
    console.log(object);
    ```

## License

[MIT](https://github.com/crookse/frozenv/blob/version/master/LICENSE)

---

[badge-npm-page-img]: https://img.shields.io/github/release/crookse/frozenv.svg?style=for-the-badge&label=LATEST%20RELEASE&colorA=black&colorB=black

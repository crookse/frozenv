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
  cooper_s: {
    make: 'Mini',
    year: '2004'
  }
});

// Access your environment variables
console.log(process.Cars.gti);
console.log(process.Cars.cooper_s);
```

## Installation

* npm

    ```shell
    $ cd /path/to/your/project
    $ npm install --save frozenv
    ```

* Git

    ```shell
    $ git clone https://github.com/crookse/frozenv.git /path/to/your/project
    ````

## Documentation

### Frozenv.setVars(namespace, variables)

**Purpose**

* Allows you to set read-only environment variables under a specific namespace under the `process` variable.

* Note: Periods in the `namespace` argument will create nested namespaces. For example, `Frozenv.setVars('this.is.my.namespace', {})` will create `process.this.is.my.namespace` and not `process['this.is.my.namespace']`.

* Note: If a preexisting namespace is specified, then it must not already be frozen in order for `Frozenv.setVars()` to work. For example, the below will not work because `Garage.Cars` will be frozen after it's used in the first `Frozen.setVars()` call:

    ```javascript
    // Require the package
    var Frozenv = require('frozenv');
    
    // Set your environment variables
    Frozenv.setVars('Garage.Cars', {
      gti: {
        make: 'Volkswagen',
        year: '2009'
      },
      cooper_s: {
        make: 'Mini',
        year: '2004'
      }
    });
    
    // Set more environment variables in the Garage.Cars namespace
    Frozenv.setVars('Garage.Cars', {
      is_350_f_sport: {
        make: 'Lexus',
        year: '2017'
      }
    });
    ```
    
    `Frozenv.setVars('env.MyNamespace', {})` will work because `env` is not frozen until you use it in a `Frozenv.setVars()` call.

* Note: This function calls `Frozenv.freezeObject()` to freeze the `variables` argument and all of its nested objects and properties.

**Type**

* `Function`

**Parameters**

* `namespace` `{String}`

    * The namespace to use under the `process` variable.

* `variables` `{Object}`

    * The variables to set as frozen environment variables.

**Throws**

* Nothing

**Returns**

* Nothing

**Example Usage**

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
      cooper_s: {
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

    // Set your environment variables
    Frozenv.setVars('Garage.Cars', {
      gti: {
        make: 'Volkswagen',
        year: '2009'
      },
      cooper_s: {
        make: 'Mini',
        year: '2004'
      }
    });

    // Access your environment variables
    console.log(process.Garage.Cars.gti);
    console.log(process.Garage.Cars.cooper_s);
    ```
---

### Frozenv.freezeObject(object)

**Purpose**

* Allows you to freeze an object including its nested objects and properties.

**Type**

* `Function`

**Parameters**

* `object` `{Object}`

    * The object to freeze.

**Throws**

* Nothing

**Returns**

* Nothing

**Example Usage**

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

[badge-npm-page-img]: https://img.shields.io/github/release/crookse/frozenv.svg?style=for-the-badge&label=LATEST%20RELEASE&colorA=black&colorB=black

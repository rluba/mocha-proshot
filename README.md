# mocha-proshot

A reporter for [mocha](http://mochajs.org) that takes a screenshot after each failed [Protractor](http://angular.github.io/protractor/) test. The filename will be derived from the name of the failed test.

## Installation
```
npm install --save-dev mocha-proshot
```

## Usage
Use the environment variable `PROSHOT_DIR` to specify the base directory for all screenshots.

Simply update your [Protractor configuration file](https://github.com/angular/protractor/blob/master/docs/referenceConf.js) to set the screenshot path and specify _mocha-proshot_ as your reporter:

```javascript
'use strict';

process.env.PROSHOT_DIR = './reports/screenshots';

exports.config = {
	...
    framework: 'mocha',
    mochaOpts: {
        reporter: 'mocha-proshot'
    },
	...
};
```

You probably want to use [mocha-multi](https://github.com/glenjamin/mocha-multi) to get your usual test reports alongside the screenshots:

```javascript
'use strict';

process.env.PROSHOT_DIR = './reports/screenshots';
process.env.multi = 'spec=- mocha-proshot=-'; // See 'mocha-multi' for configuration details

exports.config = {
	...
    framework: 'mocha',
    mochaOpts: {
        reporter: 'mocha-multi'
    },
	...
};
```

** Caveat: `mocha-multi` does not work together with Protractor's sharding feature because the latter depends on some internals of builtin mocha reporters that `mocha-multi` does not emulate. ** So use `mocha-proshot` directly if you require on sharding.

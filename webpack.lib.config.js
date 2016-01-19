(function (module) {
    'use strict';

    var getConfiguration = require('./webpack-configuration'),
        config = {};

    if (process.argv && process.argv.length && process.argv.indexOf('-build') !== -1) {
        //Build Configuration
        console.log('/***** LIBRARY BUILD ****/');
        config = getConfiguration('lib', 'prod');
    } else {
        //Development Configuration
        console.log('/***** LIBRARY DEVELOPMENT ****/');
        config = getConfiguration('lib', 'dev');
    }

    module.exports = config;

})(module);

(function (module) {
    'use strict';

    var getConfiguration = require('./webpack-configuration'),
        config = {};

    if (process.argv && process.argv.length && process.argv.indexOf('-build') !== -1) {
        //Build Configuration
        console.log('/***** APPLICATION BUILD ****/');
        config = getConfiguration('app', 'prod');
    } else {
        //Development Configuration
        console.log('/***** APPLICATION DEVELOPMENT ****/');
        config = getConfiguration('app', 'dev');
    }

    module.exports = config;

})(module);

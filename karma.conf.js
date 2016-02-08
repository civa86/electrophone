'use strict';

var path = require('path');

module.exports = function (config) {
    config.set({
        basePath: './',

        files: [
            'lib/**/*.spec.js'
        ],

        preprocessors: {
            'lib/**/*.spec.js': ['webpack']
        },

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        reporters: ['spec'],

        webpack: {
            module: {
                loaders: [
                    {
                        test:    /\.js$/,
                        loaders: ['babel'],
                        exclude: /node_modules/
                    }
                ]
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-webpack'
        ],

        colors: true
    });
};

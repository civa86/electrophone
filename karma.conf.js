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

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/', subdir: '.' },
                { type: 'text-summary' }
            ]
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test:    /\.spec\.js$/,
                        loaders: ['babel'],
                        exclude: /node_modules/
                    },
                    {
                        test:    /\.js$/,
                        loaders: ['isparta'],
                        exclude: /node_modules|\.spec.js$/
                    }
                ]
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack'
        ],

        colors: true
    });
};

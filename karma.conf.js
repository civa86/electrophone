'use strict';

module.exports = function (config) {
    config.set({

        files: [
            'src/**/*.spec.js'
        ],

        basePath: './',

        preprocessors: {
            //'src/**/*.js': ['webpack'],
            'src/**/*.spec.js': ['webpack']
        },

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test:    /\.js$/,
                        loaders: ['babel'],
                        exclude: /node_modules/,
                        include: __dirname

                    }
                ],
                postLoaders: [{
                    test:    /\.js$/,
                    exclude: /(node_modules|bower_components)\/|(spec.js)/,
                    loader:  'istanbul-instrumenter'
                }]
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack'
        ]

    });
};

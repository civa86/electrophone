'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',

        files: [
            'src/**/*.spec.js'
        ],

        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/', subdir: '.' },
                { type: 'text-summary' }
            ]
        },

        webpack: {
            entry:  'src/**/*.spec.js',
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
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack'
        ],

        colors: true
    });
};

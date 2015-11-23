'use strict';

module.exports = function (config) {
    config.set({

        basePath: './',

        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        files: [
            'src/**/*.js'
        ],

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]

    });
};

(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        OutputFileName,
        pluginsSet,
        watchEnabled,
        emitLintErrors;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** LIBRARY BUILD ****/');

        OutputFileName = 'web-synth.min.js';
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ];
        watchEnabled = false;
        emitLintErrors = true;

    } else {
        //Development Configuration
        console.log('/***** LIBRARY DEVELOPMENT ****/');

        OutputFileName = 'web-synth.js';
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin()
        ];
        watchEnabled = true;
        emitLintErrors = false;
    }

    module.exports = {
        entry: path.join(__dirname, 'lib/index.js'),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: OutputFileName
        },
        plugins: pluginsSet,
        resolveLoader: {
            fallback: path.join(__dirname, 'node_modules')
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loaders: ['eslint-loader', 'jscs-loader'],
                    include: path.join(__dirname, 'lib')
                }
            ],
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude: /node_modules/

                }
            ]
        },
        eslint: {
            configFile: '.eslintrc',
            emitError: emitLintErrors,
            emitWarning: !emitLintErrors,
            failOnWarning: emitLintErrors,
            failOnError: emitLintErrors
        },
        jscs: {
            emitErrors: emitLintErrors,
            failOnHint: emitLintErrors
        },
        watch: watchEnabled
    };

})(module);

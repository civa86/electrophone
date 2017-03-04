(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        entries,
        pluginsSet,
        watchEnabled,
        emitLintErrors;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** LIBRARY BUILD ****/');

        entries = {
            "electrophone": path.join(__dirname, 'lib/index.js'),
            "electrophone.min": path.join(__dirname, 'lib/index.js')
        };
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ];
        watchEnabled = false;
        emitLintErrors = true;

    } else {
        //Development Configuration
        console.log('/***** LIBRARY DEVELOPMENT ****/');

        entries = {
            "electrophone": path.join(__dirname, 'lib/index.js')
        };
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin()
        ];
        watchEnabled = true;
        emitLintErrors = false;
    }

    module.exports = {
        entry: entries,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: "[name].js"
        },
        plugins: pluginsSet,
        resolveLoader: {
            fallback: path.join(__dirname, 'node_modules')
        },
        devtool: 'source-map',
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loaders: ['eslint-loader'],
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

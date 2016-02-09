(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        OutputFileName,
        pluginsSet,
        watchEnabled;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** LIBRARY BUILD ****/');

        OutputFileName = 'web-synth.min.js';
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ];
        watchEnabled = false;

    } else {
        //Development Configuration
        console.log('/***** LIBRARY DEVELOPMENT ****/');

        OutputFileName = 'web-synth.js';
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin()
        ];
        watchEnabled = true;
    }

    module.exports = {
        entry: path.join(__dirname, 'lib/index.js'),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: OutputFileName
        },
        plugins: pluginsSet,
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: 'jscs-loader',
                    include: path.join(__dirname, 'lib')
                },
                {
                    test: /\.js$/,
                    loader: 'jshint-loader',
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
        watch: watchEnabled
    };

})(module);

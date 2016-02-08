(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack');

    //ENVIRONMENT
    function getEnvParams (env) {
        var ret = {};

        switch (env) {
            case 'dev' :
                ret.watch = true;
                ret.jshintConfig = {
                    emitErrors: false,
                    failOnHint: false
                };
                break;
            case 'prod' :
                ret.watch = false;
                ret.jshintConfig = {
                    emitErrors: true,
                    failOnHint: true
                };
                break;
        }

        return ret;
    }

    //LIBRARY
    function generateLibConfiguration (config) {
        var workingDirectory = path.join(__dirname, 'lib');

        return {
            entry: path.join(__dirname, 'lib/index.js'),
            output: {
                path: path.join(__dirname, 'dist'),
                filename: config.outputFile
            },
            plugins: config.plugins,
            jshint: config.jshintConfig,
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        loader: 'jscs-loader',
                        include: workingDirectory
                    },
                    {
                        test: /\.js$/,
                        loader: 'jshint-loader',
                        include: workingDirectory
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
            watch: config.watch
        };
    }

    //LIBRARY DEV
    function getParamsLibDev () {
        var ret = getEnvParams('dev');

        ret.outputFile = 'web-synth.js';
        ret.plugins = [
            new webpack.optimize.OccurenceOrderPlugin()
        ];

        return generateLibConfiguration(ret);
    }

    //LIBRARY BUILD
    function getParamsLibBuild () {
        var ret = getEnvParams('prod');

        ret.outputFile = 'web-synth.min.js';
        ret.plugins = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ];

        return generateLibConfiguration(ret);
    }

    //PUBLIC GET CONFIGURATION
    function getConf (target, env) {
        var ret = {};

        if (target === 'lib' && env === 'dev') {
            ret = getParamsLibDev();
        } else if (target === 'lib' && env === 'prod') {
            ret = getParamsLibBuild();
        }

        return ret;
    }

    module.exports = getConf;

}(module));

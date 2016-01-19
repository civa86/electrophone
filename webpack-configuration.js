(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        autoprefixer = require('autoprefixer'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');

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

    //APPLICATION
    function generateAppConfiguration (config) {
        var workingDirectory = path.join(__dirname, 'app');

        return {
            entry:   [
                'babel-core/polyfill',
                path.join(__dirname, 'app/src/app.js')
            ],
            output:  {
                path:     path.join(__dirname, 'publish'),
                filename: config.outputFile
            },
            plugins: config.plugins,
            postcss: [
                autoprefixer({
                    browsers: ['last 2 version']
                })
            ],
            jshint: config.jshintConfig,
            module:  {
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
                        test:    /\.js$/,
                        loaders: ['babel'],
                        exclude: /node_modules|dist/
                    },
                    {
                        test: /bootstrap\/js\//,
                        loader: 'imports?jQuery=jquery'
                    },
                    {
                        test:   /\.(woff|woff2|ttf|eot)$/,
                        loader: 'file?name=assets/fonts/[name].[ext]'
                    },
                    {
                        test:   /\.(png|jpg|jpeg|gif|svg)$/,
                        loader: 'file?name=assets/img/[name].[ext]'
                    },
                    {
                        test:   /\.(txt)$/,
                        loader: 'file?name=[name].[ext]'
                    },
                    {
                        test:   /\.js\.map$/,
                        loader: 'file?name=js/[name].[ext]'
                    },
                    {
                        test:   /\.css\.map$/,
                        loader: 'file?name=[name].[ext]'
                    },
                    {
                        test:   /\.less$/,
                        loader: ExtractTextPlugin.extract('style', 'css!less!postcss')
                    },
                    {
                        test:   /\.css$/,
                        loader: ExtractTextPlugin.extract('style', 'css')
                    },
                    {
                        test:   /\.html$/,
                        loader: 'raw'
                    }
                ]
            },
            watch:   config.watch
        };
    }

    //APPLICATION DEV
    function getParamsAppDev () {
        var ret = getEnvParams('dev');

        ret.outputFile = 'js/bundle.js';
        ret.plugins = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'app/index.html'),
                inject: 'body'
            }),
            new ExtractTextPlugin('screen.css')
        ];

        return generateAppConfiguration(ret);
    }

    //APPLICATION BUILD
    function getParamsAppBuild () {
        var ret = getEnvParams('prod');

        ret.outputFile = 'js/bundle.min.js';
        ret.plugins = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'app/index.html'),
                inject: 'body'
            }),
            new ExtractTextPlugin('screen.css')
        ];

        return generateAppConfiguration(ret);
    }

    //PUBLIC GET CONFIGURATION
    function getConf (target, env) {
        var ret = {};

        if (target === 'lib' && env === 'dev') {
            ret = getParamsLibDev();
        } else if (target === 'lib' && env === 'prod') {
            ret = getParamsLibBuild();
        } else if (target === 'app' && env === 'dev') {
            ret = getParamsAppDev();
        } else if (target === 'app' && env === 'prod') {
            ret = getParamsAppBuild();
        }

        return ret;
    }

    module.exports = getConf;

}(module));

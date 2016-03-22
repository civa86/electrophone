(function (module) {
    'use strict';
    //TODO understand how to separate package.json dependency from build...
    var path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        libPackage = require('../package.json'),
        devtoolValue,
        entry,
        output,
        pluginsSet,
        emitLintErrors;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** APPLICATION BUILD ****/');

        devtoolValue = 'source-map';
        entry = [
            './src/index'
        ];
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.[hash].min.js'
        };
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            new ExtractTextPlugin('css/screen.css'), //TODO add hash also to css
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.LIB_VERSION': JSON.stringify(libPackage.version)
            })
        ];
        emitLintErrors = true;

    } else {
        //Development Configuration
        console.log('/***** APPLICATION DEVELOPMENT ****/');

        devtoolValue = 'source-map';
        entry = [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ];
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        };
        pluginsSet = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            new ExtractTextPlugin('screen.css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.LIB_VERSION': JSON.stringify(libPackage.version)
            })
        ];
        emitLintErrors = false;
    }

    module.exports = {
        devtool: devtoolValue,
        entry: entry,
        output: output,
        plugins: pluginsSet,
        resolve: {
            alias: {
                'web-synth': path.join(__dirname, '..', 'lib')
            }
        },
        resolveLoader: {
            fallback: path.join(__dirname, 'node_modules')
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loaders: ['eslint-loader'],
                    include: path.join(__dirname, 'src')
                }
            ],
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['react-hot', 'babel'],
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    include: path.join(__dirname, '..', 'lib')
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', 'css!less')
                },
                {
                    test:   /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css')
                },
                {
                    test:   /\.(txt)$/,
                    loader: 'file?name=[name].[ext]'
                },
                {
                    test:   /\.(woff|woff2|ttf|eot)$/,
                    loader: 'file?name=assets/fonts/[name].[ext]'
                },
                {
                    test:   /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'file?name=assets/img/[name].[ext]'
                }
            ],
            noParse: [ /cytoscape/ ]
        },
        eslint: {
            configFile: '../.eslintrc',
            emitError: emitLintErrors,
            emitWarning: !emitLintErrors,
            failOnWarning: emitLintErrors,
            failOnError: emitLintErrors,
            plugins: [
                "react"
            ]
        }
    };
})(module);

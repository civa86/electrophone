(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        libPackage = require('../package.json'),
        devtoolValue,
        entry,
        output,
        pluginsSet,
        emitLintErrors,
        ExtractStyle,
        ExtractVendorStyle;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** APPLICATION BUILD ****/');

        ExtractStyle = new ExtractTextPlugin('screen.[hash].css');
        ExtractVendorStyle = new ExtractTextPlugin('vendor.[hash].css');

        devtoolValue = 'source-map';
        entry = {
            app: './src/index',
            vendor: [
                'react',
                'react-dom',
                'redux',
                'react-redux',
                'redux-thunk',
                'lodash',
                'jquery',
                'jquery-knob',
                'cytoscape'
            ]
        };
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.[hash].min.js'
        };
        pluginsSet = [
            new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.[hash].js"),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            ExtractStyle,
            ExtractVendorStyle,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.LIB_VERSION': JSON.stringify(libPackage.version),
                'process.env.GITHUB_REPO_URL': JSON.stringify(libPackage.repository.url)
            })
        ];
        emitLintErrors = true;

    } else {
        //Development Configuration
        console.log('/***** APPLICATION DEVELOPMENT ****/');

        ExtractStyle = new ExtractTextPlugin('screen.css');
        ExtractVendorStyle = new ExtractTextPlugin('vendor.css');

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
            ExtractStyle,
            ExtractVendorStyle,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.LIB_VERSION': JSON.stringify(libPackage.version),
                'process.env.GITHUB_REPO_URL': JSON.stringify(libPackage.repository.url)
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
                    loader: ExtractStyle.extract('style', 'css!less'),
                    include: path.join(__dirname, 'less')
                },
                {
                    test:   /\.css$/,
                    loader: ExtractVendorStyle.extract('style', 'css'),
                    include: /node_modules/
                },
                {
                    test:   /\.(txt)$/,
                    loader: 'file?name=[name].[ext]'
                },
                {
                    test:   /\.(woff|woff2|ttf|eot)(\?=?|$)/,
                    loader: 'file?name=assets/fonts/[name].[ext]'
                },
                {
                    test:   /\.(png|jpg|jpeg|gif|svg)(\?=?|$)/,
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

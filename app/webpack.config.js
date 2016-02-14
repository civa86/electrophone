(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        devtoolValue,
        entry,
        output,
        pluginsSet;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** APPLICATION BUILD ****/');

        devtoolValue = 'source-map';
        entry = [
            './src/index'
        ];
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.min.js'
        };
        pluginsSet = [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            //new HtmlWebpackPlugin({
            //    template: path.join(__dirname, 'app/index.html'),
            //    inject: 'body'
            //}),
            new ExtractTextPlugin('screen.css')
        ];

    } else {
        //Development Configuration
        console.log('/***** APPLICATION DEVELOPMENT ****/');

        devtoolValue = 'eval';
        entry = [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ];
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/static/'
        };
        pluginsSet = [
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('screen.css')
        ];
    }

    module.exports = {
        devtool: devtoolValue,
        entry: entry,
        output: output,
        plugins: pluginsSet,
        resolve: {
            alias: {
                'web-synth': path.join(__dirname, '..', 'dist') + '/web-synth.js'
            }
        },
        resolveLoader: {
            fallback: path.join(__dirname, 'node_modules')
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['react-hot', 'babel'],
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', 'css!less')
                }
            ],
            noParse: [ /cytoscape/ ]
        }
    };
})(module);

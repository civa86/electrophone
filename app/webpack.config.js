(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        devtoolValue;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** APPLICATION BUILD ****/');

        devtoolValue = 'source-map';

    } else {
        //Development Configuration
        console.log('/***** APPLICATION DEVELOPMENT ****/');

        devtoolValue = 'eval';

    }

    module.exports = {
        devtool: devtoolValue,
        entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/static/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
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
                }
            ]
        }
    };
})(module);

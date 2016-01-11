var path = require('path'),
    webpack = require('webpack'),
    workingDirectory = path.join(__dirname, 'lib'),
    config = {};

//-------------- CONFIGURATION ------------------------
if (process.argv && process.argv.length && process.argv.indexOf('-build') !== -1) {
    //Build Configuration
    console.log('/***** LIBRARY BUILD ****/');
    config.watch = false;
    config.outputFile = 'web-synth.min.js';
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ];
} else {
    //Development Configuration
    console.log('/***** LIBRARY DEVELOPMENT ****/');
    config.watch = true;
    config.outputFile = 'web-synth.js';
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin()
    ];
}

//-------------- EXPORT -------------------------------
module.exports = {
    entry: path.join(__dirname, 'lib/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: config.outputFile
    },
    plugins: config.plugins,
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

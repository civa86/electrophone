var path = require('path'),
    webpack= require('webpack'),
    config = {};

//-------------- CONFIGURATION ------------------------
if(process.argv && process.argv.length && process.argv.indexOf('-build') !== -1) {
    //Build Configuration
    console.log('/***** BUILD ****/');
    config.watch = false;
    config.outputFile = 'web-synth.min.js';
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ];
} else {
    //Development Configuration
    console.log('/***** DEVELOPMENT ****/');
    config.watch = true;
    config.outputFile = 'web-synth.js';
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin()
    ];
}

//-------------- EXPORT -------------------------------
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path:     path.join(__dirname, 'dist'),
        filename: config.outputFile
    },
    plugins: config.plugins,
    module: {
        loaders: [
            {
                test:    /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname

            }
        ]
    },
    watch: config.watch
};

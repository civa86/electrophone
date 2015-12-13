var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    config = {};

console.log('/***** APPLICATION DEVELOPMENT ****/');
config.watch = true;
config.outputFile = 'js/bundle.js';
config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'app/index.html'),
        inject:   'body'
    }),
    new ExtractTextPlugin('screen.css')
];

//-------------- EXPORT -------------------------------
module.exports = {
    entry:   path.join(__dirname, 'app/src/app.js'),
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
    module:  {
        loaders: [
            {
                test:    /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules|dist/
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

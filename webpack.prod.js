const config = require('./webpack.dev.js');
const webpack = require('webpack');

config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        },
        mangle: true,
        sourceMap: true,
        output: {
            comments: false
        }
    })
];

module.exports = config;

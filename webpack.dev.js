const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }]
    },
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('node_modules')
        ]
    },
    devtool: 'source-map'
};

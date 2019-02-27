const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: ['./index.js'],
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'webvoice.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
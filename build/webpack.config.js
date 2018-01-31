const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: ['./src/audio.js'],
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'audio.js',
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
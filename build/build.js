'use strict'

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');

let files = fs.readdirSync(distDir);
files.forEach(f => {
    fs.unlinkSync(path.join(distDir, f));
});

webpack(webpackConfig, function(err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
});
'use strict'

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const distDir2 = path.resolve(__dirname, '../docs/dist');

let files = fs.readdirSync(distDir);
files.forEach(f => {
    fs.unlinkSync(path.join(distDir, f));
});

webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
    console.log('正在dist目录文件到docs目录文件');
    // 复制一部分到docs目录
    if (!fs.existsSync(distDir2)) {
        fs.mkdirSync(distDir2);
    } else {
        //清理现有文件
        let files2 = fs.readdirSync(distDir2);
        files2.forEach(f => {
            fs.unlinkSync(path.join(distDir2, f));
        });
        //复制文件
        let files = fs.readdirSync(distDir);
        files.forEach(f => {
            let from = path.join(distDir, f);
            let to = path.join(distDir2, f);
            fs.writeFileSync(to, fs.readFileSync(from));
        });
    }
});
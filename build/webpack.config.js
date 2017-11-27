const path = require('path');
module.exports = {
    entry: './src/audio.js',
    output: {
        filename: 'audio.js',
        path: path.resolve(__dirname, '../dist')
    }
}
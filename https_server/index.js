var https = require('https');
var fs = require('fs');
var ws = require('ws');
var options = {
    key: fs.readFileSync('./https_server/privatekey.pem'),
    cert: fs.readFileSync('./https_server/certificate.pem')
};
var server = https.createServer(options, function(req, res) {
    res.writeHead(200);
    if (req.url.indexOf('audio.swf') > -1) {
        fs.readFile('./demo/audio.swf', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('swfobject.js') > -1) {
        fs.readFile('./demo/swfobject.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('audio.js') > -1) {
        fs.readFile('./dist/audio.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('expressInstall.swf') > -1) {
        fs.readFile('./demo/expressInstall.swf', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else {
        fs.readFile('./demo/audio.html', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    }
});

var wss = new ws.Server({ server: server });

wss.on('connection', function(o) {
    o.on('message', function(message) {
        fs.writeFile(`./demo/${new Date().getTime()}.wav`, message);
        o.send(message);
    });
});
console.log('server start @ https://127.0.0.1:8888')
server.listen(8888, '127.0.0.1');
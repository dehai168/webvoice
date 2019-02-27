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
        fs.readFile('./docs/audio.swf', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('swfobject.js') > -1) {
        fs.readFile('./docs/swfobject.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('webvoice.js') > -1) {
        fs.readFile('./docs/dist/webvoice.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('expressInstall.swf') > -1) {
        fs.readFile('./docs/expressInstall.swf', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('1517023314958.wav') > -1) {
        fs.readFile('./docs/temp/1517023314958.wav', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else {
        fs.readFile('./docs/index.html', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    }
});
server.on('error', function(error) {
    console.log(error);
});
var wss = new ws.Server({ server: server });

wss.on('connection', function(o) {
    o.on('message', function(message) {
        fs.writeFile(`./docs/temp/${new Date().getTime()}.wav`, message);
        o.send(message);
    });
});
console.log('server start @ https://127.0.0.1:8888')
server.listen(8888, '127.0.0.1');
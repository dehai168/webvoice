var https = require('https');
var fs = require('fs');
var ws = require('ws');
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};
var server = https.createServer(options, function(req, res) {
    res.writeHead(200);
    if (req.url.indexOf('audio.js') > -1) {
        fs.readFile('../dist/audio.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('recorder.js') > -1) {
        fs.readFile('../demo/recorder.js', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('recorder.html') > -1) {
        fs.readFile('../demo/recorder.html', function(err, data) {
            if (err) {
                return;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('audio.html') > -1) {
        fs.readFile('../demo/audio.html', function(err, data) {
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
        fs.writeFile(`${new Date().getTime()}.wav`, message);
        o.send(message);
    });
});

server.listen(8888, '192.168.151.151');
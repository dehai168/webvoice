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
            // res.writeHead({
            //     'Content-Type': 'aplication/javascript'
            // });
            res.end(data);
        });
    } else {
        fs.readFile('../demo/audio.html', function(err, data) {
            if (err) {
                return;
            }
            // res.writeHead({
            //     'Content-Type': 'text/html'
            // });
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
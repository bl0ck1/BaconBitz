const express = require('express')
const path = require('path')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Routing
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
})


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
	        console.log(data);
	    });

    client.on('messages', function(data) {
		client.emit('broad', data);
//		client.broadcast.emit('broad',data);
           //client.broadcast.emit('broad',data);
    })

})

server.listen(3000, () => console.log('Example app listening on port 3000!'))

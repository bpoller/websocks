var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/:resource', function (req, res) {
  res.sendfile(__dirname+'/web/'+req.params.resource);
});

app.get('/js/:resource', function (req, res) {
  res.sendfile(__dirname+'/web/js/'+req.params.resource);
});

var id = 0;
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    socket.on('getId', function (data){
        socket.emit('id', id++);
    });

    socket.on('gyroData',function (data){
         socket.broadcast.emit('gyroData', data);
     });
});
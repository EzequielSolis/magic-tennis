var express = require("express"),  
    app = express(),
    server = require('http').Server(app),
  	io = require('socket.io')(server);

app.use(express.static(__dirname + '/')); 

var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Hello World!");
});

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(router);

app.listen(8888, '0.0.0.0', function() {  
  console.log("Node server running on http://localhost:8888");
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  console.log(data);
  });
});

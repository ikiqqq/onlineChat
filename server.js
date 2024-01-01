const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5003

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  console.log('User Online');
  
  socket.on('codeboard-message', (msg) => {
    console.log('message: ' + msg);
	socket.broadcast.emit('message-from-others', msg);
  });
  
});

// const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
// http.listen(server_port, () => {
//   console.log('listening on *:' + server_port);
// });

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT} `);
})
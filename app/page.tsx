const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req: any, res: any) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket: any) => {
  socket.on('chat message', (msg: any) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
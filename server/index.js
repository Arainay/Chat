const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./router');
const { addUser, deleteUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

io.on('connection', socket => {
  console.log('New connection');

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser(socket.id, name, room);

    if (error) {
      return callback(error);
    }

    socket.join(user.room, () => {
      socket.emit('message', { id: generateId(), user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
      socket.broadcast.to(user.room).emit('message', { id: generateId(), user: 'admin', text: `${user.name} has joined` });
    });

    callback();
  });

  socket.on('sendMessage', (message) => {
    const { user } = getUser(socket.id);

    io.to(user.room).emit(
      'message',
      {
        id : generateId(),
        user: user.name,
        text: message
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

app.use(router);

server.listen(PORT, () => { console.log(`Server nas started on port ${PORT}`) });

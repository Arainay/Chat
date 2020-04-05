const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
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
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
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

  socket.on('typing', () => {
    const { user } = getUser(socket.id);

    io.to(user.room).emit('userTyping', { user: user.name });
  });

  socket.on('disconnect', () => {
    const { user } = deleteUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => { console.log(`Server nas started on port ${PORT}`) });

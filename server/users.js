const users = [];

const addUser = (id, name, room) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(item => item.name === name && item.room === room);

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const deleteUser = (id) => {
  const index = users.findIndex(item => item.id === id);

  if (index < 0) {
    return { error: 'User does not exist' };
  }

  return { user: users.splice(index, 1)[0] };
};

const getUser = (id) => {
  const user = users.find(item => item.id === id);

  if (!user) {
    return { error: 'User does not exist' };
  }

  return { user };
};

const getUsersInRoom = (room) => users.filter(item => item.room === room);

module.exports = { addUser, deleteUser, getUser, getUsersInRoom };

const { users } = require('../model/userModel');

function registerUser({ username, password, favorecido = false }) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  if (users.find(u => u.username === username)) {
    throw new Error('User already exists');
  }
  const user = { username, password, favorecido };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return user;
}

function getUser(username) {
  if (!username) throw new Error('Missing data input');
  const user = users.find(u => u.username === username);
  if (!user) throw new Error('User not found')
  return user
}

module.exports = { registerUser, loginUser, getUser };

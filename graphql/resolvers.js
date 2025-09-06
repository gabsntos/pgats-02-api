const userService = require('../service/userService');
const transferService = require('../service/transferService');
const auth = require('./authenticate')
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretdemo';

module.exports = {
  Query: {
    users: (_, { username }) => {
      return userService.getUser(username)
    },
  },
  Mutation: {
    registerUser: (_, { username, password, favorecido }) => {
      return userService.registerUser({ username, password, favorecido });
    },
    loginUser: (_, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    createTransfer: (_, { from, to, value }, context) => {
      return transferService.transfer({ from, to, value });
    },
  },
};
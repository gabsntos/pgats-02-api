const jwt = require('jsonwebtoken');
const SECRET = 'supersecretkey';

function generateToken(user) {
  return jwt.sign({ username: user.username, favorecido: user.favorecido }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

module.exports = { generateToken, verifyToken, SECRET };

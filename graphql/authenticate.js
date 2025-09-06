const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretdemo';

module.exports = function authenticate(req) {
  // Use lowercase 'authorization' for Node.js/Express headers
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return {};
  const token = authHeader.split(' ')[1];
  if (!token) return {};
  try {
    const user = jwt.verify(token, SECRET);
    return { user };
  } catch {
    return {};
  }
};
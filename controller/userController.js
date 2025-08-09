const userService = require('../service/userService');

exports.register = (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const user = userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = (req, res) => {
  const user = userService.getUser(req.params.username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

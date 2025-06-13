const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const user = await getUserByUsername(req.body.username);
    if (!user) return res.status(401).send('Invalid credentials');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Invalid credentials');
    
    req.session.user = {
      id: user.id,
      role: user.role,
      username: user.username
    };
    
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
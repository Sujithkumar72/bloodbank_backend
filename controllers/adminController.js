const { createUser } = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    // Authorization check
    if (req.session.user.role !== 'admin') {
      return res.status(403).send('Forbidden');
    }
    
    const userId = await createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
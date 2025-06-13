const { createDonor } = require('../models/donorModel');

exports.createDonor = async (req, res) => {
  try {
    // Allow admin/registration_user
    const allowedRoles = ['admin', 'registration_user'];
    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).send('Forbidden');
    }
    
    const donorId = await createDonor([
      ...Object.values(req.body),
      req.session.user.id // created_by
    ]);
    res.status(201).json({ id: donorId });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
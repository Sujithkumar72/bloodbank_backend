const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/users', adminController.createUser);
// Add other admin routes

module.exports = router;
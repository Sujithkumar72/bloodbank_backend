const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
/**
 * @swagger
 * /donors:
 *   post:
 *     summary: Create a new donor
 *     tags: [Donors]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donor'
 *     responses:
 *       201:
 *         description: Donor created successfully
 *       403:
 *         description: Forbidden
 */
router.post('/donors', donorController.createDonor);
// Add other donor routes

module.exports = router;
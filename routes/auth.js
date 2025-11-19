const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

// TODO: Add login route
// POST /api/auth/login

module.exports = router;

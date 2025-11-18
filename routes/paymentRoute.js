const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// TODO: Define routes for payment operations
// POST   /                - Create payment
// GET    /                - Get all payments
// GET    /:id             - Get payment by ID
// GET    /order/:orderId  - Get payment by order ID
// PATCH  /:id/process     - Process payment
// GET    /status/:status  - Get payments by status

// NOTE: Remember to place specific routes BEFORE parameterized routes

module.exports = router;

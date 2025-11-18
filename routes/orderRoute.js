const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// TODO: Define routes for order operations
// POST   /                 - Create order
// GET    /                 - Get all orders
// GET    /:id              - Get order by ID
// GET    /customer/:email  - Get orders by customer email
// PATCH  /:id/status       - Update order status
// DELETE /:id              - Cancel order

// NOTE: Remember to place specific routes BEFORE parameterized routes

module.exports = router;

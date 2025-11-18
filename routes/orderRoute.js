const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Specific routes MUST come before parameterized routes
router.get('/customer/:email', orderController.getOrdersByCustomerEmail);
router.patch('/:id/status', orderController.updateOrderStatus);

// CRUD routes
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.cancelOrder);

module.exports = router;

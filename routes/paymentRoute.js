const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Specific routes MUST come before parameterized routes
router.get('/order/:orderId', paymentController.getPaymentByOrderId);
router.get('/status/:status', paymentController.getPaymentsByStatus);
router.patch('/:id/process', paymentController.processPayment);

// CRUD routes
router.post('/', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);

module.exports = router;

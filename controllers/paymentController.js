const Payment = require('../models/Payment');

// TODO: Implement createPayment
// - Create payment with req.body
// - Return 201 status
const createPayment = async (req, res) => {
  // Your code here
};

// TODO: Implement getAllPayments
// - Find all payments
// - Populate order details
// - Return all payments
const getAllPayments = async (req, res) => {
  // Your code here
};

// TODO: Implement getPaymentById
// - Find payment by ID
// - Populate order details
// - Return 404 if not found
const getPaymentById = async (req, res) => {
  // Your code here
};

// TODO: Implement getPaymentByOrderId
// - Find payment by order ID
// - Populate order details
// - Return 404 if not found
const getPaymentByOrderId = async (req, res) => {
  // Your code here
};

// TODO: Implement processPayment
// - Update payment status to 'Completed'
// - Generate and set transactionId
// - Set processedAt to current date
// - Use findByIdAndUpdate
const processPayment = async (req, res) => {
  // Your code here
};

// TODO: Implement getPaymentsByStatus
// - Extract status from req.params
// - Find all payments with that status
// - Populate order details
const getPaymentsByStatus = async (req, res) => {
  // Your code here
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  processPayment,
  getPaymentsByStatus
};

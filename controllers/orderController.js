const Order = require('../models/Order');

// TODO: Implement createOrder
// - Validate that items array is not empty
// - Create order with req.body
// - Return 201 status
const createOrder = async (req, res) => {
  // Your code here
};

// TODO: Implement getAllOrders
// - Use populate() to include product details
// - Populate the 'items.product' field
// - Return all orders with populated data
const getAllOrders = async (req, res) => {
  // Your code here
};

// TODO: Implement getOrderById
// - Find order by ID
// - Use populate() for product details
// - Return 404 if not found
const getOrderById = async (req, res) => {
  // Your code here
};

// TODO: Implement getOrdersByCustomerEmail
// - Extract email from req.params
// - Find all orders for that customer email
// - Populate product details
// - Return matching orders
const getOrdersByCustomerEmail = async (req, res) => {
  // Your code here
};

// TODO: Implement updateOrderStatus
// - Extract new status from req.body
// - Use findByIdAndUpdate to update only the status field
// - Return 404 if order not found
// - Validate status is one of the enum values
const updateOrderStatus = async (req, res) => {
  // Your code here
};

// TODO: Implement cancelOrder
// - Delete order by ID
// - Return 404 if not found
// - Return success message
const cancelOrder = async (req, res) => {
  // Your code here
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByCustomerEmail,
  updateOrderStatus,
  cancelOrder
};

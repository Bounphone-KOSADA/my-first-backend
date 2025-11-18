const Product = require('../models/Product');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// ========== PRODUCT ANALYTICS ==========

// TODO: Get total products count
const getProductsCount = async (req, res) => {
  // Use Product.countDocuments()
};

// TODO: Get product count and average price by category
const getProductsByCategory = async (req, res) => {
  // Use aggregation pipeline with $group
  // Group by category, count products, calculate average price
};

// TODO: Get total inventory value (sum of price * stock for all products)
const getInventoryValue = async (req, res) => {
  // Use aggregation with $project to calculate value per product
  // Then $group to sum total
};

// ========== ORDER ANALYTICS ==========

// TODO: Get order statistics (total orders, total revenue, average order value)
const getOrderStats = async (req, res) => {
  // Use aggregation with $group to calculate:
  // - count (total orders)
  // - sum of totalAmount (total revenue)
  // - average of totalAmount
};

// TODO: Get order count and total amount by status
const getOrdersByStatus = async (req, res) => {
  // Group by status, count orders, sum totalAmount
};

// TODO: Get orders from last 30 days
const getRecentOrders = async (req, res) => {
  // Use $match with date filtering
  // createdAt >= 30 days ago
};

// TODO: Get top 5 most ordered products
const getTopProducts = async (req, res) => {
  // Use $unwind on items array
  // Group by product, sum quantities
  // Sort descending, limit 5
  // Lookup product details
};

// ========== PAYMENT ANALYTICS ==========

// TODO: Get total amount collected by payment method
const getPaymentsByMethod = async (req, res) => {
  // Group by paymentMethod, sum amounts
};

// TODO: Get payment success rate (completed vs total)
const getPaymentSuccessRate = async (req, res) => {
  // Count total payments
  // Count completed payments
  // Calculate percentage
};

// TODO: Get total revenue by payment status
const getRevenueByStatus = async (req, res) => {
  // Group by status, sum amounts
};

// TODO: Get daily revenue within date range
const getDailyRevenue = async (req, res) => {
  // Extract startDate and endDate from query params
  // Match payments in date range
  // Group by date (use $dateToString to format date)
  // Sum amounts per day
};

module.exports = {
  // Product analytics
  getProductsCount,
  getProductsByCategory,
  getInventoryValue,

  // Order analytics
  getOrderStats,
  getOrdersByStatus,
  getRecentOrders,
  getTopProducts,

  // Payment analytics
  getPaymentsByMethod,
  getPaymentSuccessRate,
  getRevenueByStatus,
  getDailyRevenue
};

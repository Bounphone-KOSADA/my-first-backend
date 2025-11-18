const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// TODO: Define analytics routes

// Product analytics
// GET /products/count
// GET /products/by-category
// GET /products/value

// Order analytics
// GET /orders/stats
// GET /orders/by-status
// GET /orders/recent
// GET /orders/top-products

// Payment analytics
// GET /payments/by-method
// GET /payments/success-rate
// GET /payments/revenue
// GET /payments/daily?startDate={date}&endDate={date}

module.exports = router;

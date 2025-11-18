const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// TODO: Add new routes for Exercise 2
// GET /search?q={query} - Search products
// GET /low-stock?threshold={num} - Get low stock products
// NOTE: These specific routes must come BEFORE /:id route to avoid conflicts

// Product routes
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts); // Supports query params: ?category=Electronics&sort=price&order=asc&page=1&limit=10
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

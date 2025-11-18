const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Specific routes MUST come before parameterized routes
router.get('/search', productController.searchProducts);
router.get('/low-stock', productController.getLowStockProducts);

// CRUD routes
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts); // Supports query params: ?category=Electronics&sort=price&order=asc&page=1&limit=10
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

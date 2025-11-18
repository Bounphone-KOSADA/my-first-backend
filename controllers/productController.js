const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Create product using request body data
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all products with filtering, sorting, and pagination
const getAllProducts = async (req, res) => {
  try {
    // TODO: Extract query parameters
    // const { category, minPrice, maxPrice, sort, order, page, limit } = req.query;

    // TODO: Build filter object
    // Example: if category exists, add to filter
    // Example: if minPrice/maxPrice exist, use $gte/$lte operators

    // TODO: Build sort object
    // Example: if sort field provided, create sort object with order (asc=1, desc=-1)

    // TODO: Implement pagination
    // Calculate skip value: (page - 1) * limit

    // TODO: Execute query with filter, sort, skip, and limit

    // For now, return all products (students will enhance this)
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    // Find product by ID from URL parameters
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    // Find and update product
    // { new: true } returns the updated document
    // { runValidators: true } runs schema validation on update
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    // Find and delete product by ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// TODO: Implement searchProducts
// - Extract 'q' query parameter
// - Use regex to search in name and description fields
// - Use $or operator to search multiple fields
// - Return matching products
const searchProducts = async (req, res) => {
  // Your code here
};

// TODO: Implement getLowStockProducts
// - Extract 'threshold' query parameter (default: 10)
// - Find products where stock is less than threshold
// - Use $lt operator
// - Return matching products
const getLowStockProducts = async (req, res) => {
  // Your code here
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getLowStockProducts
};

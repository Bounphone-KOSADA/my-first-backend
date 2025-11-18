const Product = require('../models/Product');

// TODO: Implement createProduct
// - Use Product.create() with req.body
// - Return 201 status with created product
// - Handle errors with 400 status
const createProduct = async (req, res) => {
  // Your code here
};

// TODO: Implement getAllProducts
// - Use Product.find() to get all products
// - Return 200 status with success, count, and data
// - Handle errors with 500 status
const getAllProducts = async (req, res) => {
  // Your code here
};

// TODO: Implement getProductById
// - Use Product.findById() with req.params.id
// - Return 404 if product not found
// - Return 200 status with product data
// - Handle errors with 500 status
const getProductById = async (req, res) => {
  // Your code here
};

// TODO: Implement updateProduct
// - Use Product.findByIdAndUpdate() with req.params.id and req.body
// - Use options: { new: true, runValidators: true }
// - Return 404 if product not found
// - Return 200 status with updated product
// - Handle errors with 400 status
const updateProduct = async (req, res) => {
  // Your code here
};

// TODO: Implement deleteProduct
// - Use Product.findByIdAndDelete() with req.params.id
// - Return 404 if product not found
// - Return 200 status with success message
// - Handle errors with 500 status
const deleteProduct = async (req, res) => {
  // Your code here
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

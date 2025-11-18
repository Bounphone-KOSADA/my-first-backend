const mongoose = require('mongoose');

// TODO: Define the Product schema with the following fields:
// - name: String (required)
// - description: String
// - price: Number (required, min: 0)
// - category: String (enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'])
// - stock: Number (default: 0, min: 0)
// - createdAt: Date (default: Date.now)

const productSchema = new mongoose.Schema({
  // Your schema definition here
});

// TODO: Create and export the Product model

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

// TODO: Define the Order schema with:
// - orderNumber: String (auto-generated, unique)
// - customerName: String (required)
// - customerEmail: String (required)
// - items: Array of subdocuments with:
//     - product: ObjectId (ref: 'Product', required)
//     - quantity: Number (required, min: 1)
//     - price: Number (required)
// - totalAmount: Number (required)
// - status: String (enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending')
// - createdAt: Date (default: Date.now)

const orderSchema = new mongoose.Schema({
  // Your schema definition here
});

// TODO: Add pre-save middleware to auto-generate orderNumber
// Format: ORD-YYYYMMDD-XXXX (e.g., ORD-20231117-0001)
// Use Date.now() and a random number or counter

module.exports = mongoose.model('Order', orderSchema);

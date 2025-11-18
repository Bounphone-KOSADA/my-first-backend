const mongoose = require('mongoose');

// TODO: Define the Payment schema with:
// - order: ObjectId (ref: 'Order', required, unique)
// - customerName: String (required)
// - customerEmail: String (required)
// - amount: Number (required, min: 0)
// - paymentMethod: String (enum: ['CreditCard', 'DebitCard', 'PayPal', 'Cash'], required)
// - status: String (enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending')
// - transactionId: String (unique, sparse - allows multiple nulls)
// - processedAt: Date
// - Use timestamps option for createdAt and updatedAt

const paymentSchema = new mongoose.Schema({
  // Your schema definition here
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// TODO: Add indexes
// - Create unique index on order field
// - Create sparse unique index on transactionId field

module.exports = mongoose.model('Payment', paymentSchema);

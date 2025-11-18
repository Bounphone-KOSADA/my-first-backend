# Exercise 4: Payment API with Advanced Validation

## Objective
Create a Payments API with advanced schema features: unique/sparse indexes, timestamps, and payment processing logic.

## Prerequisites
- Completed Exercise 3 (Orders API)
- MongoDB connected with Products and Orders data

## Your Tasks

### Task 1: Define Payment Schema (`models/Payment.js`)

Key features to implement:
- **ObjectId reference** to Order (unique - one payment per order)
- **Sparse unique index** on transactionId (allows multiple nulls before processing)
- **Timestamps** option for automatic createdAt/updatedAt
- **Enum validation** for paymentMethod and status

```javascript
const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  paymentMethod: {
    type: String,
    enum: ['CreditCard', 'DebitCard', 'PayPal', 'Cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  transactionId: {
    type: String,
    sparse: true,  // Allows multiple null values
    unique: true   // But enforces uniqueness when value exists
  },
  processedAt: Date
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});
```

### Task 2: Implement Payment Controller (`controllers/paymentController.js`)

Six functions to implement:

1. **createPayment** - Create new payment
2. **getAllPayments** - Get all payments (populate order)
3. **getPaymentById** - Get single payment by ID
4. **getPaymentByOrderId** - Find payment by order ID
5. **processPayment** - Update status, add transactionId, set processedAt
6. **getPaymentsByStatus** - Filter payments by status

**Key implementation for processPayment:**
```javascript
const processPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Completed',
        transactionId: transactionId || `TXN-${Date.now()}`,
        processedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    // Handle not found, return updated payment
  }
};
```

### Task 3: Define Payment Routes (`routes/paymentRoute.js`)

Remember proper route ordering:

```javascript
// Specific routes first
router.get('/order/:orderId', paymentController.getPaymentByOrderId);
router.get('/status/:status', paymentController.getPaymentsByStatus);
router.patch('/:id/process', paymentController.processPayment);

// Then parameterized routes
router.post('/', paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
```

### Task 4: Mount Routes in app.js

```javascript
const paymentRoutes = require('./routes/paymentRoute');
app.use('/api/payments', paymentRoutes);
```

## Testing

### Create Payment
```bash
POST http://localhost:3000/api/payments
{
  "order": "674abc123def456789",
  "customerName": "Alice Johnson",
  "customerEmail": "alice@example.com",
  "amount": 1998,
  "paymentMethod": "CreditCard"
}
```

### Process Payment
```bash
PATCH http://localhost:3000/api/payments/{paymentId}/process
{
  "transactionId": "TXN-CUSTOM-123"
}
```

### Get Payments by Status
```bash
GET http://localhost:3000/api/payments/status/Completed
GET http://localhost:3000/api/payments/status/Pending
```

### Get Payment by Order
```bash
GET http://localhost:3000/api/payments/order/{orderId}
```

## Key Concepts

### 1. Unique Indexes
- Ensures no duplicate values in the collection
- Used for `order` field (one payment per order)

### 2. Sparse Indexes
- Only includes documents where the indexed field exists
- Combined with unique: allows multiple null values but enforces uniqueness for non-null
- Perfect for `transactionId` (null until processed)

### 3. Timestamps
- `timestamps: true` in schema options
- Automatically manages `createdAt` and `updatedAt` fields
- No manual Date.now() needed

### 4. Partial Updates
- PATCH for updating specific fields
- Use `findByIdAndUpdate` with `{ new: true, runValidators: true }`

## Tips

- Test sparse index: Create multiple payments without transactionId (should work)
- Test unique constraint: Try processing two payments with same transactionId (should fail)
- Verify timestamps are auto-updated on document changes
- Ensure order reference exists before creating payment
- Handle cases where order might be deleted but payment exists

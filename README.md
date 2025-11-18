# Exercise 3: Orders API with Product References

## Objective
Create an Orders API that references the Product collection, demonstrating MongoDB relationships, subdocuments, population, and middleware.

## Prerequisites
- Completed Exercise 2 (Products API with advanced queries)
- MongoDB connected and running
- Products collection has sample data

## Your Tasks

### Task 1: Define Order Schema (`models/Order.js`)

Create an Order schema with the following fields:

```javascript
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

### Task 2: Add Pre-Save Middleware for Auto-Generated Order Number

Add middleware to automatically generate orderNumber before saving:

```javascript
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    // Format: ORD-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ORD-${dateStr}-${random}`;
  }
  next();
});
```

### Task 3: Implement Order Controller Functions

#### `createOrder`
```javascript
const createOrder = async (req, res) => {
  try {
    // Validate items array
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
```

#### `getAllOrders` with Population
```javascript
const getAllOrders = async (req, res) => {
  try {
    // Populate product details in items array
    const orders = await Order.find()
      .populate('items.product', 'name price category');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

#### `getOrderById`
```javascript
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

#### `getOrdersByCustomerEmail`
```javascript
const getOrdersByCustomerEmail = async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

#### `updateOrderStatus`
```javascript
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
```

#### `cancelOrder`
```javascript
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Task 4: Define Order Routes

In `routes/orderRoute.js`:

```javascript
router.get('/customer/:email', orderController.getOrdersByCustomerEmail);
router.patch('/:id/status', orderController.updateOrderStatus);
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.cancelOrder);
```

**Important:** `/customer/:email` and `/:id/status` must come before `/:id`

### Task 5: Mount Order Routes in app.js

```javascript
const orderRoutes = require('./routes/orderRoute');
app.use('/api/orders', orderRoutes);
```

## Testing Your Orders API

### Create an Order
First, get a product ID from your Products collection, then:

```bash
POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "customerName": "Alice Johnson",
  "customerEmail": "alice@example.com",
  "items": [
    {
      "product": "674131e9c8b9d1f2a3456789",
      "quantity": 2,
      "price": 999
    }
  ],
  "totalAmount": 1998
}
```

### Get All Orders (with populated products)
```bash
GET http://localhost:3000/api/orders
```

### Get Order by ID
```bash
GET http://localhost:3000/api/orders/{orderId}
```

### Get Orders by Customer Email
```bash
GET http://localhost:3000/api/orders/customer/alice@example.com
```

### Update Order Status
```bash
PATCH http://localhost:3000/api/orders/{orderId}/status
Content-Type: application/json

{
  "status": "Shipped"
}
```

### Cancel Order
```bash
DELETE http://localhost:3000/api/orders/{orderId}
```

## Key Concepts to Learn

1. **ObjectId References**
   - Using `mongoose.Schema.Types.ObjectId`
   - The `ref` property to specify which model to reference

2. **Subdocuments**
   - Arrays of embedded documents (items array)
   - Each item has product, quantity, and price

3. **Population**
   - `.populate('items.product')` - joins Product data
   - `.populate('items.product', 'name price')` - select specific fields

4. **Pre-Save Middleware**
   - Runs before document is saved
   - Auto-generate orderNumber
   - Use `this` to access document

5. **PATCH vs PUT**
   - PATCH updates specific fields (status only)
   - PUT replaces entire document

6. **Route Ordering**
   - Specific routes must come before parameterized routes
   - `/customer/:email` before `/:id`

## Tips

- Always populate when you need related data
- Validate that referenced documents exist before creating orders
- Use pre-save middleware for auto-generated fields
- Remember to handle cases where populated fields might be null (deleted products)
- Test with actual Product IDs from your database

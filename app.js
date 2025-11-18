const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
// TODO: Import paymentRoutes

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the E-Commerce API",
        endpoints: {
            products: "/api/products",
            orders: "/api/orders",
            payments: "/api/payments"
        }
    });
});

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// TODO: Mount paymentRoutes at '/api/payments'

module.exports = app;
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the E-Commerce API",
        endpoints: {
            products: "/api/products",
            orders: "/api/orders"
        }
    });
});

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
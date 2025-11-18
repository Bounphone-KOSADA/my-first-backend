const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoute');
// TODO: Import orderRoutes

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
// TODO: Mount orderRoutes at '/api/orders'

module.exports = app;
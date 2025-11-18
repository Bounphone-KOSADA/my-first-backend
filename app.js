const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoute');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Products API",
        endpoints: {
            products: "/api/products"
        }
    });
});

// Mount product routes
app.use('/api/products', productRoutes);

module.exports = app;
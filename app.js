const express = require('express');
const app = express();

// TODO: Import productRoutes from './routes/productRoute'

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Products API",
        endpoints: {
            products: "/api/products"
        }
    });
});

// TODO: Mount productRoutes at '/api/products'

module.exports = app;
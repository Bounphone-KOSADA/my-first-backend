require('dotenv').config();
const app = require('./app.js');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

// TODO: Call connectDB() to connect to MongoDB before starting the server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
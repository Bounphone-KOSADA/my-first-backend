const express = require('express')
const app = express();

const userRoutes = require('./routes/userRoute')

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello from app.js')
})

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API",
        endpoint: {
            users: "/api/users"
        }
    })
})

app.use('/api/users', userRoutes)

module.exports = app;
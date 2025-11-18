# Exercise 1: MongoDB Setup & Products API

## Objective
Learn to integrate MongoDB with Express.js and implement basic CRUD operations for a Products API.

## Setup Instructions

### 1. Install Dependencies
Dependencies are already installed:
- express
- mongoose
- dotenv

### 2. Configure MongoDB
1. Create a `.env` file (use `.env.example` as template)
2. Update `MONGODB_URI` with your MongoDB connection string
   - Local: `mongodb://localhost:27017/day2-products-db`
   - Atlas: Your MongoDB Atlas connection string

### 3. Your Tasks

#### Task 1: Database Connection (`config/db.js`)
Implement the `connectDB` function:
- Use `mongoose.connect()` with `process.env.MONGODB_URI`
- Handle connection success and errors
- Log connection status to console

#### Task 2: Product Schema (`models/Product.js`)
Define the Product schema with these fields:
- `name`: String (required)
- `description`: String
- `price`: Number (required, minimum: 0)
- `category`: String (enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'])
- `stock`: Number (default: 0, minimum: 0)
- `createdAt`: Date (default: Date.now)

#### Task 3: Product Controller (`controllers/productController.js`)
Implement all five controller functions:

1. **createProduct**
   - Use `Product.create(req.body)`
   - Return 201 status on success
   - Return 400 status on error

2. **getAllProducts**
   - Use `Product.find()`
   - Return 200 status with { success, count, data }
   - Return 500 status on error

3. **getProductById**
   - Use `Product.findById(req.params.id)`
   - Return 404 if not found
   - Return 200 status with { success, data }
   - Return 500 status on error

4. **updateProduct**
   - Use `Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })`
   - Return 404 if not found
   - Return 200 status with updated product
   - Return 400 status on error

5. **deleteProduct**
   - Use `Product.findByIdAndDelete(req.params.id)`
   - Return 404 if not found
   - Return 200 status with success message
   - Return 500 status on error

#### Task 4: Product Routes (`routes/productRoute.js`)
Define these routes:
- `POST /` - Create product
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product

#### Task 5: Connect Everything (`app.js` and `index.js`)
- In `app.js`: Import and mount productRoutes at '/api/products'
- In `index.js`: Call `connectDB()` before starting the server

## Running the Application

```bash
# Start the server
node index.js
```

## Testing Your API

### Create a Product
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999,
  "category": "Electronics",
  "stock": 15
}
```

### Get All Products
```bash
GET http://localhost:3000/api/products
```

### Get Product by ID
```bash
GET http://localhost:3000/api/products/{id}
```

### Update Product
```bash
PUT http://localhost:3000/api/products/{id}
Content-Type: application/json

{
  "price": 899,
  "stock": 10
}
```

### Delete Product
```bash
DELETE http://localhost:3000/api/products/{id}
```

## Expected Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* product object */ }
}
```

### Success Response with Multiple Items
```json
{
  "success": true,
  "count": 5,
  "data": [ /* array of products */ ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Key Concepts to Learn
- MongoDB connection with Mongoose
- Schema definition and validation
- Model creation
- Async/await with database operations
- Error handling in async functions
- RESTful API endpoints
- HTTP status codes (200, 201, 400, 404, 500)

## Tips
- Use try-catch blocks in all controller functions
- Always validate required fields in schema
- Use meaningful error messages
- Test each endpoint as you build it
- Check MongoDB connection before testing routes

# Exercise 2: Products API with Advanced Queries

## Objective
Build on Exercise 1 by adding advanced query features: filtering, sorting, pagination, and search functionality.

## Prerequisites
- Completed Exercise 1 (Basic Product CRUD is already implemented)
- MongoDB connected and running
- `.env` file configured

## Your Tasks

### Task 1: Enhanced `getAllProducts` with Filtering, Sorting & Pagination

Modify the `getAllProducts` function in `controllers/productController.js` to support:

#### Query Parameters to Support:
- `category` - Filter by category
- `minPrice` - Filter products with price >= minPrice
- `maxPrice` - Filter products with price <= maxPrice
- `sort` - Field to sort by (e.g., "price", "name", "stock")
- `order` - Sort order: "asc" or "desc"
- `page` - Page number for pagination (default: 1)
- `limit` - Items per page (default: 10)

#### Implementation Steps:

1. **Extract query parameters**
   ```javascript
   const { category, minPrice, maxPrice, sort, order, page, limit } = req.query;
   ```

2. **Build filter object**
   ```javascript
   const filter = {};
   if (category) filter.category = category;
   if (minPrice || maxPrice) {
     filter.price = {};
     if (minPrice) filter.price.$gte = Number(minPrice);
     if (maxPrice) filter.price.$lte = Number(maxPrice);
   }
   ```

3. **Build sort object**
   ```javascript
   const sortObj = {};
   if (sort) {
     sortObj[sort] = order === 'desc' ? -1 : 1;
   }
   ```

4. **Calculate pagination**
   ```javascript
   const pageNum = parseInt(page) || 1;
   const limitNum = parseInt(limit) || 10;
   const skip = (pageNum - 1) * limitNum;
   ```

5. **Execute query**
   ```javascript
   const products = await Product.find(filter)
     .sort(sortObj)
     .skip(skip)
     .limit(limitNum);
   ```

### Task 2: Implement `searchProducts` Function

Create a search endpoint that searches products by name or description:

```javascript
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    // Build regex pattern for case-insensitive search
    const searchPattern = new RegExp(q, 'i');

    // Search in name OR description
    const products = await Product.find({
      $or: [
        { name: searchPattern },
        { description: searchPattern }
      ]
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Task 3: Implement `getLowStockProducts` Function

Create an endpoint to find products with low stock:

```javascript
const getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;

    // Find products where stock is less than threshold
    const products = await Product.find({
      stock: { $lt: threshold }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      threshold: threshold,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Task 4: Add New Routes

In `routes/productRoute.js`, add these routes **BEFORE** the `/:id` route:

```javascript
router.get('/search', productController.searchProducts);
router.get('/low-stock', productController.getLowStockProducts);
```

**Important:** These must come before `router.get('/:id')` to avoid route conflicts!

## Testing Your Enhanced API

### Filter by Category
```bash
GET http://localhost:3000/api/products?category=Electronics
```

### Filter by Price Range
```bash
GET http://localhost:3000/api/products?minPrice=10&maxPrice=100
```

### Sort Products
```bash
# Sort by price ascending
GET http://localhost:3000/api/products?sort=price&order=asc

# Sort by name descending
GET http://localhost:3000/api/products?sort=name&order=desc
```

### Pagination
```bash
# Get page 2 with 5 items per page
GET http://localhost:3000/api/products?page=2&limit=5
```

### Combined Query
```bash
GET http://localhost:3000/api/products?category=Electronics&minPrice=100&sort=price&order=asc&page=1&limit=10
```

### Search Products
```bash
GET http://localhost:3000/api/products/search?q=laptop
```

### Get Low Stock Products
```bash
# Default threshold of 10
GET http://localhost:3000/api/products/low-stock

# Custom threshold
GET http://localhost:3000/api/products/low-stock?threshold=5
```

## Key Concepts to Learn
- Query parameters in Express (`req.query`)
- MongoDB comparison operators (`$gte`, `$lte`, `$lt`)
- MongoDB logical operators (`$or`)
- Regular expressions for text search
- Query chaining (`.find().sort().skip().limit()`)
- Pagination logic
- Dynamic filter building

## Tips
- Always convert query parameters to correct types (Number, parseInt)
- Provide default values for pagination (page: 1, limit: 10)
- Use RegExp with 'i' flag for case-insensitive search
- Remember route order matters - specific routes before parameterized routes
- Test edge cases: empty results, invalid parameters, etc.

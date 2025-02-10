/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/easyshop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  discount: Number,
  sizes: [String],
});
const Product = mongoose.model('Product', productSchema);

// Sample product data
const productsData = {
  men: [
    { name: 'Men\'s T-Shirt', price: 20, discount: 10, sizes: ['S', 'M', 'L', 'XL'] },
    { name: 'Men\'s Jeans', price: 40, discount: 15, sizes: ['28', '30', '32', '34'] },
    // Add 8 more sample men products here
  ],
  women: [
    { name: 'Women\'s Dress', price: 50, discount: 20, sizes: ['S', 'M', 'L'] },
    { name: 'Women\'s Skirt', price: 30, discount: 5, sizes: ['M', 'L', 'XL'] },
    // Add 8 more sample women products here
  ],
  kids: [
    { name: 'Kids\' T-Shirt', price: 15, discount: 5, sizes: ['S', 'M'] },
    { name: 'Kids\' Jeans', price: 25, discount: 10, sizes: ['S', 'M', 'L'] },
    // Add 8 more sample kids products here
  ],
  latest: [
    { name: 'Latest Fashion Jacket', price: 80, discount: 30, sizes: ['M', 'L', 'XL'] },
    { name: 'New Arrival Shoes', price: 60, discount: 20, sizes: ['8', '9', '10'] },
    // Add 8 more latest products here
  ]
};

// Seed products into the database
const seedProducts = async () => {
    try {
      // Loop through each category (men, women, kids, latest)
      for (let category in productsData) {
        // Loop through each product in that category
        for (let product of productsData[category]) {
          const newProduct = new Product(product);
          await newProduct.save(); // Save the product to the database
        }
      }
      console.log("Products seeded successfully!");
    } catch (error) {
      console.error("Error seeding products:", error);
    }
  };
  

// Uncomment this line to seed products on initial run
seedProducts();

// Routes
app.get('/api/products/:category', async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  res.json(products);
});

app.get('/api/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.post('/api/orders', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ message: 'Order placed successfully!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/easyshop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  discount: Number,
  sizes: [String],
  image: String
});
const Product = mongoose.model('Product', productSchema);

// Sample product data
const productsData = {
  men: [
    { name: 'Men\'s T-Shirt', price: 20, discount: 10, sizes: ['S', 'M', 'L', 'XL'] , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLT9GBt94Ir-q3MG8x56Z1C4dzxzIGrlrufNKa5hU8cnIlcVZx-y92KeKeZNOKHzjRPhI&usqp=CAU"},
    { name: 'Men\'s Jeans', price: 40, discount: 15, sizes: ['28', '30', '32', '34'] , image: "https://example.com/womens-dress.jpg"},
    // Add 8 more sample men products here
  ],
  women: [
    { name: 'Women\'s Dress', price: 50, discount: 20, sizes: ['S', 'M', 'L'] , image: "https://example.com/womens-dress.jpg"},
    { name: 'Women\'s Skirt', price: 30, discount: 5, sizes: ['M', 'L', 'XL'] , image: "https://example.com/womens-dress.jpg"},
    // Add 8 more sample women products here
  ],
  kids: [
    { name: 'Kids\' T-Shirt', price: 15, discount: 5, sizes: ['S', 'M'] , image: "https://example.com/womens-dress.jpg" },
    { name: 'Kids\' Jeans', price: 25, discount: 10, sizes: ['S', 'M', 'L'], image: "https://example.com/womens-dress.jpg" },
    // Add 8 more sample kids products here
  ],
  latest: [
    { name: 'Latest Fashion Jacket', price: 80, discount: 30, sizes: ['M', 'L', 'XL'] , image: "https://example.com/womens-dress.jpg"},
    { name: 'New Arrival Shoes', price: 60, discount: 20, sizes: ['8', '9', '10'], image: "https://example.com/womens-dress.jpg" },
    // Add 8 more latest products here
  ]
};

// Seed products into the database
const seedProducts = async () => {
    try {
      for (let category in productsData) {
        for (let product of productsData[category]) {
          const newProduct = new Product(product);
          await newProduct.save();

        }
      }
      console.log("Products seeded successfully!");
    } catch (error) {
      console.error("Error seeding products:", error);
    }
};

// Uncomment this line to seed products on initial run
seedProducts();

// Routes
app.get('/api/products/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Product not found' });
  }
});

// Define Order Schema and Model
const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      size: String
    }
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Route to Store Orders
app.post('/api/orders', async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // Create new order based on cart items
    const newOrder = new Order({
      products: cart,
      totalAmount
    });
    console.log('Order to be saved:', newOrder);
    // Save to the database
    await newOrder.save();

    // Return a response with order details
    res.json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cart feature
let cart = [];

app.post('/api/cart/add', (req, res) => {
  const { id, name, price, size } = req.body; // ✅ Added size
  cart.push({ id, name, price, size });
  res.json({ message: 'Item added to cart', cart });
});

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("server is running"));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    const mockProducts = [
      { name: "Wireless Mouse", price: 599 },
      { name: "Mechanical Keyboard", price: 2499 },
      { name: "Noise Cancelling Headphones", price: 4999 },
      { name: "Smartwatch", price: 2999 },
      { name: "Gaming Laptop", price: 84999 },
      { name: "USB-C Hub", price: 899 },
      { name: "Bluetooth Speaker", price: 1299 },
      { name: "External SSD", price: 5999 },
    ];
    await Product.insertMany(mockProducts);
    console.log(" Mock products seeded successfully!");
  } else {
    console.log("Products already exist, skipping seeding.");
  }
};
seedProducts();

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error", error: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

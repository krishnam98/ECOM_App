const Cart = require("../models/Cart.js");
const CartItem = require("../models/CartItem.js");

exports.checkout = async (req, res) => {
  try {
    const userId = "mockuser";

    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: { path: "product" },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Calculating total securely from backend
    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Creating a mock receipt object
    const receipt = {
      user: userId,
      total,
      purchasedItems: cart.items.map((i) => ({
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      timestamp: new Date().toISOString(),
    };

    for (const item of cart.items) {
      await CartItem.findByIdAndDelete(item._id);
    }

    cart.items = [];
    await cart.save();

    res.json({
      message: "Checkout successful",
      receipt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

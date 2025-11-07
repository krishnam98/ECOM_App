const Cart = require("../models/Cart.js");
const CartItem = require("../models/CartItem.js");
const Product = require("../models/Product.js");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: "mockuser" })
      .populate("items")
      .populate({
        path: "items",
        populate: { path: "product" },
      });

    if (!cart) return res.json({ items: [], total: 0 });

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: "mockuser" }).populate("items");

    if (!cart) {
      cart = await Cart.create({ userId: "mockuser", items: [] });
    }

    // Checking if product already in user's cart
    let existingCartItem = await CartItem.findOne({
      _id: { $in: cart.items },
      product: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += qty;
      await existingCartItem.save();
    } else {
      const newItem = await CartItem.create({ product, quantity: qty });
      cart.items.push(newItem);
      await cart.save();
    }

    res.json({ message: "Added to cart successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // id of CartItem

    // Find cart item
    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    // Decrease quantity
    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      return res.json({ message: "Item quantity decreased", item });
    }

    // If quantity = 1 → remove item completely
    await CartItem.findByIdAndDelete(id);

    // Also remove reference from user's cart
    const cart = await Cart.findOne({ userId: "mockuser" });
    if (cart) {
      cart.items = cart.items.filter(
        (cartItemId) => cartItemId.toString() !== id
      );
      await cart.save();
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

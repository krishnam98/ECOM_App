const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: "mockuser" }).populate({
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

    let existingCartItem = await CartItem.findOne({
      _id: { $in: cart.items },
      product: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += qty;
      await existingCartItem.save();
    } else {
      const newItem = await CartItem.create({
        product: productId,
        quantity: qty,
      });
      cart.items.push(newItem);
      await cart.save();
    }

    const updatedCart = await Cart.findOne({ userId: "mockuser" }).populate({
      path: "items",
      populate: { path: "product" },
    });

    const total = updatedCart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.json({ items: updatedCart.items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
    } else {
      await CartItem.findByIdAndDelete(id);
      await Cart.updateOne({ userId: "mockuser" }, { $pull: { items: id } });
    }

    const updatedCart = await Cart.findOne({ userId: "mockuser" }).populate({
      path: "items",
      populate: { path: "product" },
    });

    const total = updatedCart
      ? updatedCart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      : 0;

    res.json({ items: updatedCart ? updatedCart.items : [], total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

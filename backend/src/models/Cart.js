const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: "mockuser" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
});

module.exports = mongoose.model("Cart", cartSchema);

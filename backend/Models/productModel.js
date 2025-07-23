const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { filename: String, path: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

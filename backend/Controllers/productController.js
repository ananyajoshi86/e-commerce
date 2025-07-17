const Product = require("../Models/productModel.js");
const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { update } = require("../Models/userModel.js");

const addproductcontroller = async (req, res) => {
  try {
    const { name, price, description, category, rating } = req.body;
    const file = req.file;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      rating,
      img: file
        ? { path: file.filename, filename: file.originalname }
        : undefined,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadImageController = (req, res) => {
  try {
    res.send({
      success: true,
      message: "img uploaded successfully",
      imagename: req.file.filename,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const allproductcontroller = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).send({
      success: true,
      data: products,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      message: "Fetched paginated products successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, price } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};
const getproductcontroller = async (req, res) => {
  try {
    const { id } = req.body; // Get id from request body
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res.status(200).send({ success: true, data: product });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cart) {
      user.cart = [];
    }

    const qty = Math.max(1, parseInt(quantity) || 1);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += qty;
    } else {
      user.cart.push({ product: productId, quantity: qty });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const Popularcontroller = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(10);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const reverseProductscontroller = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addproductcontroller,
  uploadImageController,
  deleteProductController,
  updateProductController,
  allproductcontroller,
  getproductcontroller,
  addToCartController,
  Popularcontroller,
  reverseProductscontroller,
};

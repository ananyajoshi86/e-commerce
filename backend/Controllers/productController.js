const Product = require("../Models/productModel.js");
const User = require("../Models/userModel.js");
const mongoose = require("mongoose");

//  Add Product
const addproductcontroller = async (req, res) => {
  try {
    const { name, price, description, category, rating } = req.body;
    let image = null;
    if(req.file){
    image = {
      filename: req.file.filename,
      path: `http://localhost:5000/uploads/${req.file.filename}`,
    };
    }

    const file = req.file;

    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      rating: rating || 0,
      image
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
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

//  All Products with Pagination
const allproductcontroller = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: products,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      message: "Fetched paginated products successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update Product
const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, price } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

//  Get Product by ID (via req.params)
const getproductcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Add to Cart
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

// Popular Products (based on rating)
const Popularcontroller = async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(10);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Latest Products 
const reverseProductscontroller = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export All
module.exports = {
  addproductcontroller,
  deleteProductController,
  updateProductController,
  allproductcontroller,
  getproductcontroller,
  addToCartController,
  Popularcontroller,
  reverseProductscontroller,
};

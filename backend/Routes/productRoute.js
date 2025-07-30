const { Router } = require("express");
const upload = require("../Middlewares/upload");
const {
  addproductcontroller,
  updateProductController,
  deleteProductController,
  allproductcontroller,
  getproductcontroller,
  addToCartController,
  Popularcontroller,

  reverseProductscontroller,
} = require("../Controllers/productController.js");
const { update } = require("../Models/userModel.js");
const Product = require("../Models/productModel.js");
const User = require("../Models/userModel.js");
// const authMiddleware = require("../Middlewares/authMiddleware.js");
const authMiddleware = require("../Middlewares/authMiddleware.js");

const router = Router();

router.get("/allproducts", allproductcontroller);
router.get("/popular", Popularcontroller);
router.get("/reverseproducts", reverseProductscontroller);
router.get("/product/:id", getproductcontroller);

router.post("/create", upload.single("img"), addproductcontroller);
router.delete("/delete/:id", deleteProductController);
router.put("/update/:id", authMiddleware, updateProductController);
router.post("/addtocart", addToCartController);

router.put("/image", upload.any("image", 6), (req, res) => {
  res.send({
    success: true,
    message: "Images uploaded successfully",
    images: req.files,
  });
});
router.post(
  "/multiimage",
  upload.fields([{ name: "image", maxCount: 6 }, { name: "banner" }]),
  (req, res) => {
    res.json({ image: req.files });
  }
);


router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({ totalUsers, totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products", async (req, res) => {
  const category = req.query.category;

  try {
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get("/popular", Popularcontroller);

// router.get("/product/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.json({ data: product });
// });

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send({ message: "Query required" });

  try {
    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res.send({ data: results });
  } catch (err) {
    res.status(500).send({ message: "Search failed" });
  }
});
router.get("/reverseproducts", reverseProductscontroller);

module.exports = router;

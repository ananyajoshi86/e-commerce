const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const upload = require("../Middlewares/upload");
const verifyToken = require("../Middlewares/verifyToken");

const {
  registeruserController,
  loginController,
  getProfileController,
  alluserController,
  deleteuserController,
  forgotpassword,
  verifyOtp,
  newPassword,
  resetPassword,
} = require("../Controllers/userController");
const { uploadImageController } = require("../Controllers/productController");

const router = Router();

// register user with image
router.post("/register", upload.single("image"), registeruserController);

// login
router.post("/login", loginController);

// upload a single image
router.post("/image", upload.single("image"), uploadImageController);

// get all user
router.get("/allusers", verifyToken, alluserController);

// protected profile route
router.get("/profile", verifyToken, getProfileController);

// delete user by token
router.delete(  "/delete",  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res
          .status(401)
          .send({ success: false, message: "Token Not Found" });
      }

      const token = authHeader.split("")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.headers.id = decoded.id;
      next();
    } catch (error) {
      res.status(401).send({ success: false, message: "Unauthorized" });
    }
  },
  deleteuserController
);

// set forgot password
router.post("/forgot-password", forgotpassword);
router.post("/verify-otp", verifyOtp);
router.post("/newpassword", newPassword);
router.post("/reset-password", resetPassword);

// Serve static HTML for testing password reset
router.get("/newpassword", (req, res) => {
  const filepath = path.join(__dirname, "../newpassword.html");
  const file = fs.readFileSync(filepath, "utf-8");
  res.send(file);
});

module.exports = router;

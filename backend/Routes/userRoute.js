const { Router } = require("express");

const multer = require("multer");
const path = require("path");
const upload = require("../Middlewares/upload");
const jwt = require("jsonwebtoken");
const {
  alluserController,
  registeruserController,
  loginController,
  deleteuserController,
  uploadImageController,
  getProfileController,
  forgotpassword,
  verifyOtp,
  newPassword,
  resetPassword,
} = require("../Controllers/userController.js");
const verifyToken = require("../Middlewares/verifyToken.js");
const fs = require("fs");
const router = Router();

router.post("/register", upload.single("img"), registeruserController);
router.get("/allusers", alluserController);
router.post("/login", loginController);
router.post("/image", upload.single("img"), uploadImageController);
router.delete(
  "/delete",
  async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(400).send({ success: false, message: "Token Not Found" });
    }
    if (token) {
      let decoded = await jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      req.headers.id = decoded.id;
    }
    next();
  },
  deleteuserController
);
router.get("/profile", verifyToken, getProfileController);

// forget password apis
router.post("/forgot-password", forgotpassword);
router.post("/verify-otp", verifyOtp);
router.post("/newpassword", newPassword);
router.post("/reset-password", resetPassword);

router.get("/newpassword", (req, res) => {
  let filepath = path.join(__dirname, "../newpassword.html");
  let file = fs.readFileSync(filepath, "utf-8");
  res.send(file);
});

module.exports = router;

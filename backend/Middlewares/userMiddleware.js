// Middlewares/userAuth.js
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel.js");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. No token found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Invalid or expired token",
        error: error.message,
      });
  }
};

module.exports = userAuth;

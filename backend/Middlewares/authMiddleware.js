// Middlewares/adminAuth.js
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel.js");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token. Unauthorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not found" });
    }

    req.admin = admin; // attach admin info to request
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: error.message });
  }
};

module.exports = adminAuth;

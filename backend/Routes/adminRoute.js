const express = require("express");
const router = express.Router();
const {
  loginadmin,
  registeradmin,
  logoutAdmin,
} = require("../Controllers/adminController");
const adminAuth = require("../Middlewares/authMiddleware");


// Public routes
router.post("/login", loginadmin);
router.post("/register", registeradmin);
router.post("/logout", logoutAdmin);

// Protected route example
router.get("/dashboard", adminAuth, (req, res) => {
  res.send({ success: true, message: "Welcome Admin", admin: req.admin });
});

module.exports = router;

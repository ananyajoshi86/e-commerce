const { Router } = require("express");
const { loginadmin, registeradmin } = require("../Controllers/adminController");
const adminAuth = require("../Middlewares/authMiddleware");


const router = Router();

// Public admin routes
router.post("/register", registeradmin);
router.post("/login", loginadmin);

// Protected admin route
router.get("/dashboard", adminAuth, (req, res) => {
  res.send(`Welcome, Admin: ${req.admin.name}`);
});

module.exports = router;

const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const upload = require("../Middlewares/upload.js");
const jwt = require("jsonwebtoken");
const {
  loginadmin,
  registeradmin,
} = require("../Controllers/adminController.js");
const verifyToken = require("../Middlewares/verifyToken.js");
const fs = require("fs");
const router = Router();

router.post("/register", registeradmin);

router.post("/login", loginadmin);

module.exports = router;

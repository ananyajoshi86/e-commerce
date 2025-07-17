
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 172123-image.png
  },
});


const upload = multer({ storage });


router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  res.json({
    filename: req.file.filename,
    path: req.file.path,
    url: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router;

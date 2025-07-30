const Admin = require("../Models/adminModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Middlewares/sendEmail.js");

// Admin Login
const loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 🧁 Set cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Registration
const registeradmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newadmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    await sendEmail(email, "Welcome Admin!");

    const token = jwt.sign(
      { id: newadmin._id, email: newadmin.email, name: newadmin.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 🧁 Set token in cookie
    res.cookie("adminToken", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: newadmin._id,
        name: newadmin.name,
        email: newadmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// admin logout
const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.send({ success: true, message: "Logged out successfully" });
};

module.exports = {
  loginadmin,
  registeradmin,
  logoutAdmin,
};

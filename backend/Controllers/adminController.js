const Admin = require("../Models/adminModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Middlewares/sendEmail.js");
const mongoose = require("mongoose");

let loginadmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });
    }
    let isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }
    let token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    res
      .status(200)
      .send({ success: true, message: "Admin login successful", token, admin });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const registeradmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newadmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    await sendEmail(email);
    res.status(201).send({
      success: true,
      message: "Created Successfully",
      data: newadmin,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = {
  loginadmin,
  registeradmin,
};

// userController.js
const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Middlewares/sendEmail.js");
const mongoose = require("mongoose");

// register user
const registeruserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = null;
    if (req.file) {
      image = {
        filename: req.file.filename,
        path: "http://localhost:5000/" + req.file.path,
      };
    }
    if (!name || !email || !password ) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }
     const user = await User.findOne({ email });
     if (user) {
       return res
         .status(400)
         .send({ success: false, message: "User already registered" });
     }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await sendEmail(email);
    res
      .status(201)
      .send({ success: true, message: "Created Successfully", data: newUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all user
const alluserController = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      data: users,
      message: "Fetched all users successfully.",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// upload user image
const uploadImageController = (req, res) => {
  try {
    res.send({
      success: true,
      message: "Image uploaded successfully",
      image: req.file.filename,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// user login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({success:false, message:"Email and password are required"})
    }
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, img: user.img },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res
      .status(200)
      .send({ success: true, message: "Login successful", token, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// delete user
const deleteuserController = async (req, res) => {
  try {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get user profile
const getProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// forgot password
const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "300s",
    });

    await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_token: token,
    });
    await sendEmail(email, `Your OTP: ${otp}`);

    res.status(200).json({ success: true, message: "OTP sent", token });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// user verify otp
const verifyOtp = async (req, res) => {
  try {
    const { otp, token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || otp !== user.forgot_password_otp)
      return res.status(400).send({ success: false, message: "Invalid OTP" });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });

    res.send({ success: true, refresh_token: refreshToken });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// user new password
const newPassword = async (req, res) => {
  try {
    const { refresh_token, password } = req.body;
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refresh_token !== refresh_token)
      return res.status(401).send({ success: false, message: "Unauthorized" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgot_password_otp: "",
      forgot_password_token: "",
      refresh_token: "",
    });

    res.send({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// user reset password
const resetPassword = async (req, res) => {
  try {
    const { email, oldpassword, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch)
      return res
        .status(401)
        .send({ success: false, message: "Incorrect password" });

    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();

    res.send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  registeruserController,
  alluserController,
  uploadImageController,
  loginController,
  deleteuserController,
  getProfileController,
  forgotpassword,
  verifyOtp,
  newPassword,
  resetPassword,
};

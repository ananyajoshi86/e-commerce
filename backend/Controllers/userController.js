const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Middlewares/sendEmail.js");
const mongoose = require("mongoose");

// Register User
const registeruserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,

      // img: {
      //   filename: req.file.filename,
      //   path: req.file.filename,
      // },
    });
    await sendEmail(email);
    res.status(201).send({
      success: true,
      message: "Created Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


alluserController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      data: users,
      message: "Fetched all users successfully.",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

uploadImageController = (req, res) => {
  try {
    res.send({
      success: true,
      message: "img uploaded successfully",
      imagename: req.file.filename,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }
    let token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, img: user.img },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res
      .status(200)
      .send({ success: true, message: "User login successful", token, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
let deleteuserController = async (req, res) => {
  try {
    let id = req.headers.id;
    console.log(id);
    let user = await User.findById(id);
    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "user not found" });
    }
    let data = await User.findByIdAndDelete(id);
    res.send({ success: true, message: "Users deleted successfully", data });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getProfileController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

let forgotpassword = async (req, res) => {
  try {
    let { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    let genrateotp = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    let otp = genrateotp();

    let genratetoken = async (id) => {
      let token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "300s",
      });
      return token;
    };
    let forgot_token = await genratetoken(user._id);
    await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_token: forgot_token,
    });

    await sendEmail(email, `this is your otp:  ${otp}`);

    res.status(200).json({
      success: true,
      message: "forgot otp sent , Please check your registered mail",
      token: forgot_token,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
let verifyOtp = async (req, res) => {
  try {
    let { otp, token } = req.body;

    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).send({ sucess: false, message: "user not found" });
    }
    if (otp != user.forgot_password_otp) {
      return res.status(404).send({ sucess: false, message: "Invalid Otp" });
    }

    let genratetoken = async (id) => {
      let token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    };
    let forgot_token = await genratetoken(user._id);
    await User.findByIdAndUpdate(decode.id, { refresh_token: forgot_token });
    res.send({ decode, refresh_token: forgot_token });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

let newPassword = async (req, res) => {
  try {
    let { refresh_token, password } = req.body;

    let decode = await jwt.verify(refresh_token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).send({ success: false, message: "unauthorized" });
    }

    let user = await User.findById(decode.id);

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "user not found" });
    }
    if (!user.refresh_token) {
      return res.status(401).send({
        success: false,
        message: "You are not able to access this resource",
      });
    }
    let saltround = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, saltround);

    await User.findByIdAndUpdate(user._id, {
      password: hashpassword,
      forgot_password_otp: "",
      forgot_password_token: "",
      refresh_token: "",
    });
    res.send({ success: true, message: "password change successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
let resetPassword = async (req, res) => {
  try {
    let { email, oldpassword, newpassword } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "user not found" });
    }
    let verifypassword = await bcrypt.compare(oldpassword, user.password);

    if (verifypassword) {
      user.password = await bcrypt.hash(newpassword, 10);
      user.save();
    } else {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    res.send({ success: true, message: "password reset successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  alluserController,
  registeruserController,
  uploadImageController,
  loginController,
  deleteuserController,
  getProfileController,
  forgotpassword,
  verifyOtp,
  newPassword,
  resetPassword,
};

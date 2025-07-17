const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminschema);

module.exports = Admin;

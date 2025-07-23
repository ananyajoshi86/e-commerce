const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(" MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDb;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./db/connectDB.js");
const cookieParser = require("cookie-parser");

const path = require("path");
const app = express();
const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute.js");
const adminRoute = require("./Routes/adminRoute.js");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const port = process.env.PORT || 5000;

dotenv.config();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

connectDb();
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(404)
    .send({ success: false, message: err.message || "Route not found" });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./db/connectDB.js");

const path = require("path");
const app = express();
const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute.js");
const adminRoute = require("./Routes/adminRoute.js");
const uploadRoute = require("./Routes/uploadRoute.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 5000;


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", express.static(path.join(__dirname, "../frontend/dist")));
const main =path.join(__dirname, "../frontend/dist/index.html")
console.log(main, "")
app.get("/",(req, res)=>(res.sendFile(main)))

console.log(path.join(__dirname, "../frontend/dist"));
connectDb();
app.use("/api", uploadRoute)
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute)
app.use("/api/product",productRoute)
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(404)
    .send({ success: false, message: err.message || "Route not found" });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

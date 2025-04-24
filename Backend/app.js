require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// Import routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const panoramaRouter = require("./routes/Panorama"); // ✅ API xử lý panorama
const hotspotRouter = require("./routes/Hotspot"); // ✅ API xử lý hotspot
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(cors({
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log("✅ Kết nối MongoDB thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/panorama", panoramaRouter); // ✅ API panorama
app.use("/api/hotspot", hotspotRouter); // ✅ API hotspot

// Xử lý lỗi 404
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});


module.exports = app;

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();
const path = require("path");
// const responseTime = require("response-time");

const fileUpload = require("./routes/file-upload");

const apiRoute = require("./routes/api");
const userRoute = require("./routes/user");
const Router = require("./routes/router");

const connectDatabase = require("./configs/db");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5000",
      "https://dashboard.sdacharn.com",
    ],
    credentials: true,
  })
);

// app.use(responseTime());

// ===== Middleware =====
app.use("/public/", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// ===== Route Controller Management =====
app.use(apiRoute);
app.use(fileUpload);
app.use(userRoute);
app.use(Router);
// app.use(userRoute);

// ===== Connecte to the Database =====
connectDatabase();

const PORT = 9001;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`));

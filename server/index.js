require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const qr = require("qrcode");
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
      "http://localhost:9002",
      "https://www.saladigital.org",
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
// const generateQR = async (text) => {
//   try {
//     console.log(await qr.toDataURL(text));
//   } catch (err) {
//     console.error(err);
//   }
// };
// generateQR("http://imharshpatel.com");

// let data = {
//   id: 1,

//   name: "User",

//   email: "user@gmail.com",
// };

// let strData = JSON.stringify(data);

// qr.toString(
//   strData,
//   { type: "terminal" },

//   function (err, code) {
//     if (err) return console.log("error occurred");

//     console.log(code);
//   }
// );

// qr.toDataURL(strData, function (err, code) {
//   if (err) return console.log("error occurred");

//   console.log(code);
// });

const PORT = 9001;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`));

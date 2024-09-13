const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes.js");
const sellerRoutes = require("./routes/sellerRoutes.js");
const buyerRoutes = require("./routes/buyerRoutes.js");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/buyer", buyerRoutes);

module.exports = app;

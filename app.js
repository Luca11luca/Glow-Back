require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
 
const authRouter = require("./router/auth.router");
const cartRouter = require("./router/cart.router");
const favoritesRouter = require("./router/favorites.router");
 
const app = express();
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("uploads"));
app.use(cors({
  origin: ["https://splendid-marzipan-e920bc.netlify.app", "http://localhost:5173"]
}));
 
app.use("/api", authRouter);
app.use("/api", cartRouter);
app.use("/api", favoritesRouter);
 
module.exports = app;
 
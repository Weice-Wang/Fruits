// IMPORTS
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");

// GLOBAL VARIABLE
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDELEWARE

app.use(
  express.urlencoded({
    extended: false,
  })
);

// INDEX ROUTES
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// NEW ROUTE
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// CREATE ROUTE
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  console.log(req.body);
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

// APP LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

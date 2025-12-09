// IMPORTS
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js");
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

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

app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// HOME ROUTES
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// NEW ROUTE
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  console.log(allFruits); // log the list
  res.render("fruits/index.ejs", {
    // express identify the views, but cannot get deeeper folders
    fruits: allFruits,
  });
});

// DELETE ROUTE

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

// UPDATE ROUTE
app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  res.redirect(`/fruits/${req.params.fruitId}`);
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
  res.redirect("/fruits");
});

// server.js

// EDIT ROUTE
// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  console.log(foundFruit);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});

// SHOW ROUTE
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  console.log(foundFruit);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

// APP LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

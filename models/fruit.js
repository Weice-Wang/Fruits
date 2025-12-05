const mongoose = require("mongoose");

// SCHEMA
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// MODEL
const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;

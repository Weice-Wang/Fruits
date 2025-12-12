const express = require("express");
const router = express.Router(); //create router object
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//NEW USER FORM
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

module.exports = router;

// CREATE USER IN DB
router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10); // scramble the user’s password into a difficult-to-decrypt string, and salting
  req.body.password = hashedPassword;

  // validation logic

  const user = await User.create(req.body);
  res.send(`Thanks for signing up ${user.username}`);
});

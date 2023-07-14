const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user-model");
const router = express.Router();
const login = require("../controllers/login");

router.post("/login", login);

router.post("/register", (req, res) => {
  res.json(UserSchema);
});

module.exports = router;

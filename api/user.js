const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json(UserSchema);
});

router.post("/register", (req, res) => {
  res.json(UserSchema);
});

module.exports = router;

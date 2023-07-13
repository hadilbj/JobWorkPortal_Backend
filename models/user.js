const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

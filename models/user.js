const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const express = require ('express');
const router = express.Router();

const UserSchema = new Schema({
    firstname: String,
    finalname: String,
    password: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

module.exports = router;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;




var express = require("express");
var router = express.Router();
var userHandlers = require("../controllers/user");
const login = require("../auth/login");

router.post("/register", (req, res) => {
  userHandlers.register(req, res);
});

router.post("/login", (req, res) => {
  console.log("test");
  login(req, res);
});

module.exports = router;

var express = require("express");
var router = express.Router();
var userHandlers = require("../controllers/user");
const { login } = require("../controllers/login");

router.post("/register", (req, res) => {
  userHandlers.register(req, res);
});

router.post("/login", login);

module.exports = router;

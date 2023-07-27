var express = require("express");
var router = express.Router();
var userHandlers = require("../controllers/user");
const { login } = require("../controllers/login");
const user = require("../controllers/user");

router.post("/register", (req, res) => {
  userHandlers.register(req, res);
});

router.post("/login", login);

router.post("/createUser", user.create);
router.get("/getAllUser", user.findAll);
router.get("/getUser", user.findOne);

router.put("/updateUser", user.update);

router.delete("/deleteUser", user.delete);
router.delete("/deleteAll", user.deleteAll);

module.exports = router;

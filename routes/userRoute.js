
var express=require("express")
var router = express.Router()
  var userHandlers = require("../controllers/user");

  router.post("/register", (req,res)=>{
    userHandlers.register(req,res)
  });

  module.exports = router
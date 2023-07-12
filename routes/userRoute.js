module.exports = function (app) {
  var userHandlers = require("../controllers/user");

  app.route("/auth/register").post(userHandlers.register);
};

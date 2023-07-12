const User = require("../models/user");

exports.register = function (req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ email: "l'utilisateur est déjà enregistré avec cet email" });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
        });
        newUser.save();
        return res.status(200).json({ msg: newUser });
      }
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de l'enregistrement de l'utilisateur",
        });
    });
};

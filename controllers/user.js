const User = require("../models/user-model");

exports.register = function (req, res) {
  //console.log("test")
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          email: "L'utilisateur est déjà enregistré avec cette adresse e-mail",
        });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
        });
        newUser
          .save()
          .then((savedUser) => {
            console.log(savedUser);
            const { firstname, lastname, email } = savedUser;
            return res.status(200).json({ firstname, lastname, email });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              error:
                "Une erreur s'est produite lors de l'enregistrement de l'utilisateur",
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error:
          "Une erreur s'est produite lors de la recherche de l'utilisateur",
      });
    });
};

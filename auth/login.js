const User = require("../models/user");
const jwt = require("jsonwebtoken");

const token = require("../models/user");

const bcrypt = require("bcrypt");

exports.login = function (req, res) {
  const { email, password } = req.body;
  // Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "Utilisateur introuvable" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error:
              "Une erreur s'est produite lors de la comparaison des mots de passe",
          });
        }

        if (!isMatch) {
          return res.status(400).json({ password: "Mot de passe incorrect" });
        }

        // Return the user details in the response
        const { firstname, lastname, email } = user;
        return res.status(200).json({ user: { firstname, lastname, email } });
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error:
          "Une erreur s'est produite lors de la recherche de l'utilisateur",
      });
    });
};

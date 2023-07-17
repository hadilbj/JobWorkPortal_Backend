const config = require("../config/auth-config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log(req.body.password);
      console.log(bcrypt.compareSync(req.body.password, user.password));
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      // Effectuer une requête séparée pour récupérer les détails des rôles
      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then((roles) => {
          // Utiliser les détails des rôles comme nécessaire
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }

          res.status(200).send({
            password: user.password,
            email: user.email,
            roles: authorities,
            accessToken: token,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
/* exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      } else {
        bcrypte
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Paire login/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user_id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
}; */


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

// create and save new user
exports.create = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //create user
  const user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });
  //save user
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

//Retrieve all users from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email
    ? { email: { $regex: new RegExp(email), $options: "i" } }
    : {};
  User.find(condition)
    .then((data) => {
      console.log("test");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.query.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.query.id;


  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.query.id;
  //console.log(req.params.id)

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.status(500).send({
        message: `${data.deletedCount} users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

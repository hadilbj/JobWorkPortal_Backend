const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const register = require("./controllers/user");

const UserRouter = require("./routes/userRoute");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Role = require ('./models/user-model')

//routes

app.get("/", (req, res) => {
  res.send("Hello JobWorkPortal ");
});

app.use("/user", UserRouter);

const db = require("./models/index");
mongoose
  .connect(
    "mongodb+srv://hadilbenjabra1:Admin123@workportal.9obizxh.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
    initial();
    app.listen(5050, () => {
      console.log("API JobWorkPortal app is running ");
    });
  })
  .catch((error) => {
    console.log(error);
  });

function initial() {
  Role.countDocuments({})
    .exec()
    .then((count) => {
      if (count === 0) {
        new Role({ name: "user" })
          .save()
          .then(() => {
            console.log("added 'user' to roles collection");
          })
          .catch((err) => {
            console.log("error", err);
          });

        new Role({ name: "moderator" })
          .save()
          .then(() => {
            console.log("added 'moderator' to roles collection");
          })
          .catch((err) => {
            console.log("error", err);
          });

        new Role({ name: "admin" })
          .save()
          .then(() => {
            console.log("added 'admin' to roles collection");
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    })
    .catch((err) => {
      console.error("Erreur lors du comptage des documents :", err);
    });
}

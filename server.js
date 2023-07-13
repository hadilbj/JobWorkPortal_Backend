const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const register = require("./controllers/user");

const UserRouter = require("./routes/userRoute");

const User = require("./models/user");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//routes

app.get("/", (req, res) => {
  res.send("Hello JobWorkPortal ");
});

/* app.post("/login", (req, res) => {
  res.json("login");
}); */

app.use("/user", UserRouter)


mongoose
  .connect(
    "mongodb+srv://hadilbenjabra1:Admin123@workportal.9obizxh.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(5050, () => {
      console.log("API JobWorkPortal app is running ");
    });
  })
  .catch((error) => {
    console.log(error);
  });

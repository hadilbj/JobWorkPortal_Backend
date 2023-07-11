const express = require("express");
const mongoose = require("mongoose");
const app = express();

//routes

app.get("/", (req, res) => {
  res.send("Hello JobWorkPortal ");
});

app.get("/login", (req, res) => {
  res.send("Hello JobWorkPortal app ");
});

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

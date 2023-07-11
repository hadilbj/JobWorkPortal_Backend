const express = require("express");
const app = express();

//routes

app.get("/", (req, res) => {
  res.send("Hello JobWorkPortal ");
});

app.listen(5000, () => {
  console.log("API JobWorkPortal app is running ");
});

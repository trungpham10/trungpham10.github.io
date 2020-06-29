const express = require("express");
const app = express();
const port = 3000;

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(port, () => {
  console.log("Listening at port", port);
});

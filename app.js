const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./src/db/mongoose");
const Task = require("./src/models/task");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

app.post("/", (req, res) => {
  n = req.body.namee;
  desc = req.body.description;

  const item = new Task({
    name: n,
    description: desc,
    date: new Date().toLocaleString().split(",")[0],
    time: new Date().getTime(),
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  Item.findByIdAndRemove(req.body.checkbox, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001.");
});

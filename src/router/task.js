const express = require("express");
const Task = require("../db/models");
const router = new express.Router();

router.get("/test", (req, res) => {
  res.send("From a new file");
});

router.get("/", (req, res) => {
  // Promise.reject()
  Task.find({})
    .then((newListItem) => {
      res.render("list", { newListItem });
    })
    .catch((e) => {
      res.render("list", { error: true });
    });
});

router.post("/", async (req, res) => {
  n = req.body.namee;
  desc = req.body.description;

  const item = new Task({
    name: n,
    description: desc,
    date: new Date().toLocaleString().split(",")[0],
    time:
      new Date().getHours() +
      " : " +
      new Date().getMinutes() +
      " : " +
      new Date().getSeconds(),
  });
  await item.save();
  res.redirect("/");
});

router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  Task.findById(id)
    .then((data) => {
      res.render("edit", { newListItem: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/update", async (req, res) => {
  var dataRecords = {
    name: req.body.uname,
    description: req.body.desc,
  };

  await Task.findByIdAndUpdate(req.body.id, dataRecords)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/delete/:id", async (req, res) => {
  var id = req.params.id;
  await Task.findByIdAndRemove(id, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

module.exports = router;

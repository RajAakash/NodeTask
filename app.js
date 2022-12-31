const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/mongoose");
const Task = require("./src/db/models");
const taskRouter = require("./src/router/task");

const app = express();

app.use(taskRouter);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   // Promise.reject()
//   Task.find({})
//     .then((newListItem) => {
//       res.render("list", { newListItem });
//     })
//     .catch((e) => {
//       res.render("list", { error: true });
//     });
// });

// app.post("/", async (req, res) => {
//   n = req.body.namee;
//   desc = req.body.description;

//   const item = new Task({
//     name: n,
//     description: desc,
//     date: new Date().toLocaleString().split(",")[0],
//     time:
//       new Date().getHours() +
//       " : " +
//       new Date().getMinutes() +
//       " : " +
//       new Date().getSeconds(),
//   });
//   await item.save();
//   res.redirect("/");
// });

// app.get("/edit/:id", function (req, res, next) {
//   var id = req.params.id;
//   Task.findById(id)
//     .then((data) => {
//       res.render("edit", { newListItem: data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.post("/update", async (req, res) => {
//   var dataRecords = {
//     name: req.body.uname,
//     description: req.body.desc,
//   };

//   await Task.findByIdAndUpdate(req.body.id, dataRecords)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/delete/:id", async (req, res) => {
//   var id = req.params.id;
//   await Task.findByIdAndRemove(id, (err) => {
//     if (!err) {
//       console.log("Successfully deleted");
//       res.redirect("/");
//     }
//   });
// });

app.listen(3001, () => {
  console.log("listening on port 3000.");
});

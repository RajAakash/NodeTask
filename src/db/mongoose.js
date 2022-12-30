const mongoose = require("mongoose");
const Task = require("./models");

mongoose.connect("mongodb://localhost:27017/mylist");

// const task1 = new Task({
//   name: "Bebest",
//   description: "requires a lot",
//   date: new Date().toLocaleString().split(",")[0],
//   time: new Date().getTime(),
// });

// task1
//   .save()
//   .then(() => {
//     console.log(task1);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const express = require("express");
const router = new express.Router();
const {
  getAllTasks,
  postTask,
  editTask,
  updateTask,
  deleteTask,
} = require("../controller/task");

//route for getting all task
router.get("/", getAllTasks);

//route for adding a task
router.post("/", postTask);

//route for edit page
router.get("/edit/:id", editTask);

//api for updating a task
router.post("/update", updateTask);

//route for deleting a task
router.get("/delete/:id", deleteTask);

module.exports = router;

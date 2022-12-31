const Task = require("../db/models");

/**
 * Get all tasks from database
 * @param {object} req
 * @param {object} res
 */

const getAllTasks = async (req, res) => {
  // Promise.reject()
  try {
    const newListItem = await Task.find({});
    res.render("list", { newListItem });
  } catch (e) {
    res.render("list", { error: true });
  }
};

/**
 * Add a task to database
 * @param {object} req
 * @param {object} res
 */
const postTask = async (req, res) => {
  try {
    let currrentDate = new Date();
    const item = new Task({
      name: req.body.name,
      description: req.body.description,
      date: currrentDate.toLocaleString().split(",")[0],
      time:
        currrentDate.getHours() +
        " : " +
        currrentDate.getMinutes() +
        " : " +
        currrentDate.getSeconds(),
    });

    await item.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Provide edit form for task
 * @param {object} req
 * @param {object} res
 */

const editTask = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Task.findById(id);
    res.render("edit", { newListItem: data });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Update the edited task
 * @param {object} req
 * @param {object} res
 */
const updateTask = async (req, res) => {
  try {
    let dataRecords = {
      name: req.body.name,
      description: req.body.description,
    };

    await Task.findByIdAndUpdate(req.body.id, dataRecords);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Delete a particular task
 * @param {object} req
 * @param {object} res
 */
const deleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    await Task.findByIdAndRemove(id, (err) => {
      if (!err) {
        console.log("Successfully deleted");
        res.redirect("/");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllTasks,
  postTask,
  editTask,
  updateTask,
  deleteTask,
};

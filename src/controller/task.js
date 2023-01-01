import Task from "../db/models";

/**
 *
 * Get all tasks from database
 *
 */

export const getAllTasks = async (req, res) => {
  const { status } = req.query;
  let queryMatcher = [
    {
      $project: {
        date: 1,
        time: 1,
        name: 1,
        convertedDate: {
          $dateFromString: {
            dateString: {
              $concat: ["$date", "$time"],
            },
            timezone: "+05:45",
          },
        },
      },
    },
  ];
  if (status === "upcoming") {
    queryMatcher.push({
      $match: { convertedDate: { $gt: new Date() } },
    });
  }
  if (status === "completed") {
    queryMatcher.push({
      $match: { convertedDate: { $lte: new Date() } },
    });
  }
  queryMatcher.push({
    $sort: {
      convertedDate: 1,
    },
  });

  try {
    const newListItem = await Task.aggregate(queryMatcher);
    res.render("list", { newListItem, url: status });
  } catch (e) {
    res.render("list", { error: true });
  }
};
/**
 *
 * Add a task to database
 *
 */
export const postTask = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;
    const item = new Task({
      name: name,
      description: description,
      date: date,
      time: time,
    });

    await item.save();
    res.redirect("/");
  } catch (e) {
    res.render("list", { error: true });
  }
};

/**
 *
 * Provide edit form for task
 *
 */

export const editTask = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Task.findById(id);
    res.render("edit", { newListItem: data });
  } catch (e) {
    res.render("list", { error: true });
  }
};

/**
 *
 * Update the edited task
 *
 */
export const updateTask = async (req, res) => {
  try {
    let dataRecords = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
    };

    await Task.findByIdAndUpdate(req.body.id, dataRecords);
    res.redirect("/");
  } catch (e) {
    res.render("list", { error: true });
  }
};

/**
 *
 * Delete a particular task
 *
 */
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.redirect("/");
  } catch (e) {
    res.render("list", { error: true });
  }
};

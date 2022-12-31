const Task = require("../db/models");

const testPage = (req, res) => {
  res.send("From a new file");
};

const getAllProducts = async (req, res) => {
  // Promise.reject()
  await Task.find({})
    .then((newListItem) => {
      res.render("list", { newListItem });
    })
    .catch((e) => {
      res.render("list", { error: true });
    });
};

const postProduct = async (req, res) => {
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
};

const editProduct = async (req, res) => {
  var id = req.params.id;
  await Task.findById(id)
    .then((data) => {
      res.render("edit", { newListItem: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProducts = async (req, res) => {
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
};

const deleteProducts = async (req, res) => {
  console.log(res);
  var id = req.params.id;
  await Task.findByIdAndRemove(id, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
};

module.exports = {
  testPage,
  getAllProducts,
  postProduct,
  editProduct,
  updateProducts,
  deleteProducts,
};

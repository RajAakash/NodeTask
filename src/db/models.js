const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlphanumeric(value)) {
        throw new Error("Name is not valid");
      }
    },
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = Task;

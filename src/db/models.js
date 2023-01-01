import mongoose from "mongoose";
import validator from "validator";

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
    trim: true,
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

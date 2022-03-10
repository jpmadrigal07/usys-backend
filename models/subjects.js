const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjects = new Schema({
  courseNumber: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

module.exports = mongoose.model("Subjects", subjects);

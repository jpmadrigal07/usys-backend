const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumSemesters = new Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
  semestersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

module.exports = mongoose.model("CurriculumSemesters", curriculumSemesters);

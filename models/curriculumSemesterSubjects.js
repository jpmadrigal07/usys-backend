const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumSemesterSubjects = new Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
  semesterId: {
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

module.exports = mongoose.model(
  "CurriculumSemesterSubjects",
  curriculumSemesterSubjects
);

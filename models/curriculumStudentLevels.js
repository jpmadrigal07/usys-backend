const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumStudentLevels = new Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
  studentLevelsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentLevel",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

module.exports = mongoose.model(
  "CurriculumStudentLevels",
  curriculumStudentLevels
);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumStudentType = new Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
  studentTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentType",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

module.exports = mongoose.model("CurriculumStudentType", curriculumStudentType);

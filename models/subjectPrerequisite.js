const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectPrerequisite = new Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  requiredSubjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

module.exports = mongoose.model("SubjectPrerequisite", subjectPrerequisite);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const collegeLevel = new Schema({
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('CollegeLevel', collegeLevel);

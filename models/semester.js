const mongoose = require('mongoose');
const { Schema } = mongoose;

const semester = new Schema({
    name: String,
    isActive: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('Semester', semester);

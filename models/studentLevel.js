const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentLevel = new Schema({
    type: String,
    level: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('StudentLevel', studentLevel);
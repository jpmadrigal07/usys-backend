const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentType = new Schema({
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('StudentType', studentType);

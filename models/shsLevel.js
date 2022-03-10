const mongoose = require('mongoose');
const { Schema } = mongoose;

const shsLevel = new Schema({
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('ShsLevel', shsLevel);

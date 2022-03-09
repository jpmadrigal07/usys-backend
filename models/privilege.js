const mongoose = require('mongoose');
const { Schema } = mongoose;

const privilege = new Schema({
    desc: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('Privilege', privilege);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userLevel = new Schema({
    level: Number,
    privileges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Privilege"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('UserLevel', userLevel);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userType = new Schema({
    type: String,
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

module.exports = mongoose.model('UserType', userType);
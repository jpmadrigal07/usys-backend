const mongoose = require('mongoose');
const { Schema } = mongoose;

const userPrivileges = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    privilege: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Privilege"
    },
    isDefault: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('UserPrivileges', userPrivileges);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cashier = new Schema({
    payment: Number,
    cashTendered: Number,
    change: Number,
    note: String,
    studentId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model('Cashier', cashier);
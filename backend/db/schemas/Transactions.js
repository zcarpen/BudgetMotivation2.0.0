const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const TransactionsSchema = mongoose.Schema({
    expenseType: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    userID: {
        type: String,
        required: true,
    }
})

const Transaction = mongoose.model("Transaction", TransactionsSchema);
module.exports = Transaction;
import mongoose  from 'mongoose'

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

export const Transaction = mongoose.model("Transaction", TransactionsSchema);
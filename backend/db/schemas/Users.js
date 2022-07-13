const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    visibleExpenses: {
        type: Array,
        required: true,
    },
    monthlyIncome: {
        type: Number,
        required: true,
    },
    monthlyBudget: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
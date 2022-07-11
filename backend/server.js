const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3002;
const User = require('./db/models/Users');

const app = express();

app.use(express.json())

mongoose.connect(
    "mongodb+srv://zcarpen:delete123@budgetmotivation.7zcyafe.mongodb.net/?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true
    }
);

app.post('/', async (req, res) => {
    const user = new User({
        username: 'zcarpen', 
        visibleExpenses: ['coffee', 'grocery', 'gas', 'entertainment', 'house', 'games', 'other'], 
        monthlyIncome: 4800, 
        monthlyBudget: 3500, 
        transactions: []
    });

    try {
        console.log(user)
        await user.save();
        console.log('what?')
        res.status(200).send('inserted new user')
    } catch(error) {
        res.status(404).send('cannot post')
        console.log(error)
    }
})



app.listen(3001, () => {
    console.log(`listening on port ${3001}`)
})
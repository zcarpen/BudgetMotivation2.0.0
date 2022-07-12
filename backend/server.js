const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3002;
const User = require('./db/schemas/Users');
const Transaction = require('./db/schemas/Transactions')
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json())

mongoose.connect(
    "mongodb+srv://zcarpen:delete123@users.1ej04hd.mongodb.net/BudgetMotivation?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true
    }
);


// API Routes
app.get('/login', async (req, res) => {
    const user = await User.find({"username": "zcarpen"});

    // if user[0].password and enteredpassword match
        // create new JWT
        // put it in cookies
        // redirect to main expense page
    // else
        // signal warning
    const transactions = await Transaction.find({userID: user[0]._id.toString()})
    res.send({user, transactions})
})

app.post('/create-user', async (req, res) => {
    let user = {
        username: 'noemicarpen', 
        visibleExpenses: ['coffee', 'grocery', 'gas', 'entertainment', 'house', 'games', 'other'], 
        monthlyIncome: 4000, 
        monthlyBudget: 3500, 
        password: 'delete123'
    };
    
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const hashedUser = new User({
            ...user, 
            password: hashedPassword,
        })
        
        const result = await hashedUser.save();
        res.status(200).send('inserted new user')
    } catch(error) {
        res.status(404).send('cannot post')
        console.log(error)
    }
})

app.post('/create-transaction', async (req, res) => {
    const transaction = new Transaction({
        expenseType: 'coffee', 
        cost: 5.35, 
        userID: "62cd9eb542492c91ba5dd82a"
    });

    try {
        const result = await transaction.save();
        res.status(200).send('transaction created')
    } catch(error) {
        res.status(404).send('cannot create transaction')
        console.log(error)
    }
})



app.listen(3001, () => {
    console.log(`listening on port ${3001}`)
})
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3002;
const User = require('./db/schemas/Users');
const Transaction = require('./db/schemas/Transactions')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const user = await User.find({"username": "noemicarpen"});
    const password = 'delete123'
    console.log(process.env.SECRET)

    if (!user) {
        return res.status(400).send('Cannot find user')
    }

    try {
        console.log(user)
        if (await bcrypt.compare(password, user[0].password)) {
            const transactions = await Transaction.find({userID: user[0]._id.toString()})
            const secret = process.env.SECRET;
            console.log('this is the secret from the dotenv file ', secret)
            const signedToken = jwt.sign({data: {userID: user[0]._id, username: user[0].username}}, secret )
            console.log(signedToken)
            res.cookie("accessToken", signedToken);
            res.send({user, transactions})
            // redirect to main expense page
        } else {
            res.status(400).send('password does not match')
        }
    } catch(error) {
        console.log(error)
    }
})

// function authenticateToken(req, res, next) {
//     const authHeader = req.

    // jwt.verify(token, process.env.SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     console.log(user)
    // })
// }

app.post('/create-user', async (req, res) => {
    let user = {
        username: 'noemicarpen', 
        visibleExpenses: ['coffee', 'grocery', 'gas', 'entertainment', 'house', 'games', 'other'], 
        monthlyIncome: 4000, 
        monthlyBudget: 3500, 
        password: 'delete123'
    };
    
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
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
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./db/schemas/Users');
const Transaction = require('./db/schemas/Transactions')

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json())

mongoose.connect(
    "mongodb+srv://zcarpen:delete123@users.1ej04hd.mongodb.net/BudgetMotivation?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true
    }
);


async function authenticateToken(req, res, next) {
    const cookie = req.headers.cookie
    const JWT = cookie.split("; ").filter(c => c.startsWith('accessToken'))[0].split('=')[1]
    console.log(JWT)

    await jwt.verify(JWT, process.env.SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
            // redirect to login
        }
            
        req.user = user;
    })

    next();
}

// API Routes
app.get('/login', async (req, res) => {
    const user = await User.find({"username": "noemicarpen"});
    const password = 'delete123'
    console.log(process.env.SECRET)

    if (!user) {
        return res.status(401).send('Cannot find user')
    }

    try {
        if (await bcrypt.compare(password, user[0].password)) {
            const transactions = await Transaction.find({userID: user[0]._id.toString()})
            const secret = process.env.SECRET;
            const signedToken = jwt.sign({data: {userID: user[0]._id, username: user[0].username}}, secret )
            res.cookie("accessToken", signedToken);
            res.send({user, transactions})
            // redirect to main expense page
        } else {
            res.status(401).send('password does not match')
        }
    } catch(error) {
        console.log(error)
    }
})

app.post('/sign-up', async (req, res) => {
    let user = {
        username: 'noecarpen', 
        visibleExpenses: ['coffee', 'grocery', 'gas', 'entertainment', 'house', 'games', 'other'], 
        monthlyIncome: 4000, 
        // monthlyBudget: 3500, 
        password: 'delete123'
    };
    // verify client info is correct...
        // if not, send 400 back
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const hashedUser = new User({
            ...user, 
            password: hashedPassword,
        })

        // if (err) res.status(409).end()

        const result = await hashedUser.save();
        // redirect to login page
        res.status(201).send('inserted new user')
    } catch(error) {
        if (error.code === 11000) {
            res.status(409).send()
        } else {
            console.log(error)
            res.status(500).send(error)
        }
        // distinguish errors
    }
})

app.post('/create-transaction', authenticateToken, async (req, res) => {
    console.log(req.user)
    const transaction = new Transaction({
        expenseType: 'coffee', 
        cost: 5.35, 
        userID: `${req.user.userID}`
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
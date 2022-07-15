const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./db/schemas/Users');
const Transaction = require('./db/schemas/Transactions');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb+srv://zcarpen:delete123@users.1ej04hd.mongodb.net/BudgetMotivation?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true
    }
);




async function authenticateToken(req, res, next) {
    const cookie = req.headers.cookie
    console.log(cookie)
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
app.post('/login', async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.find({"username": username});
    
        if (!user) {
            throw new Error('Cannot find user')
        }

        if (await bcrypt.compare(password, user[0].password)) {
            const transactions = await Transaction.find({userID: user[0]._id.toString()})
            const secret = process.env.SECRET;
            const signedToken = jwt.sign({data: {userID: user[0]._id, username: user[0].username}}, secret )
            // console.log(signedToken)
            // res.cookie("accessToken", signedToken)
            // localStorage.setItem('accessToken', signedToken)
            res.send({user, transactions, accessToken: signedToken})
            // redirect to main expense page
        } else {
            throw new Error('password does not match')
        }
    } catch(error) {
        console.log(error)
        res.status(401).send(error.message)
    }
})

app.post('/sign-up', async (req, res) => {
    const {username, income, budget, password} = req.body;
    console.log(username, income, budget, password)
    if (
        username.length < 6 || 
        password.length < 6 || 
        Number(budget) <= 0 || 
        Number(budget) !== Number(Number(budget).toFixed(2)) ||
        Number(income) <= 0 || 
        Number(income) !== Number(Number(income).toFixed(2))
    ) {
        res.status(401).send('information is not correct')
    }
    let user = {
        username, 
        visibleExpenses: ['other', 'coffee', 'grocery', 'gas', 'eat-out', 'movie', 'music', 'house', 'gifts', 'snack', 'games', 'self-care'], 
        monthlyIncome: Number(income), 
        monthlyBudget: Number(budget), 
        password: password
    };

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
            res.status(409).send('redundant username')
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
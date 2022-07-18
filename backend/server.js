import { config } from 'dotenv'
config();

import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import { User } from './db/schemas/Users'
import { Transaction } from './db/schemas/Transactions'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError.js'
import { UnauthorizedError } from './errors/UnauthorizedError.js'
import { handleRequest } from './handle-request.js'
import { ResourceInvalidError } from './errors/ResourceInvalidError.js'
import { ResourceAlreadyExistsError } from './errors/ResourceAlreadyExistsError.js'
import { InternalServerError } from './errors/InternalServerError.js'
import { validateNewUser } from './db/validate';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

function authenticateToken(req, res, next) {
    const accessToken = req.headers.authorization

    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
            
        req.user = user;
        next()
    })
}

// API Routes
app.post('/login', (req, res) => handleRequest({ res }, async () => {
    const {username, password} = req.body
    const user = await User.findOne({ username });
    console.log(user)
        
    if (!user) {
        throw new ResourceNotFoundError('Cannot find user')
    }

    const authenticated = await bcrypt.compare(password, user.password)
    if (!authenticated) throw new UnauthorizedError('password does not match')
        
    const transactions = await Transaction.find({userID: user._id.toString()})
    const secret = process.env.SECRET;
    const signedToken = jwt.sign({data: {userID: user._id, username: user.username}}, secret )

    res.send({ user: { username }, transactions, accessToken: signedToken })
}))

app.post('/sign-up', (req, res) => handleRequest({ res }, async () => {
    const {username, income, budget, password} = req.body;
    console.log(username, income, budget, password)

    const errors = validateNewUser({ username, password, income, budget })
    if (errors.length) throw new ResourceInvalidError(JSON.stringify(errors))

    let user = {
        username, 
        visibleExpenses: ['other', 'coffee', 'grocery', 'gas', 'eat-out', 'movie', 'music', 'house', 'gifts', 'snack', 'games', 'self-care'], 
        monthlyIncome: Number(income), 
        monthlyBudget: Number(budget), 
        password: password
    };

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const hashedUser = new User({
        ...user, 
        password: hashedPassword,
    })

    try {
        await hashedUser.save();
    } catch (err) {
        if (err.code === 11000) throw new ResourceAlreadyExistsError('username already taken')
        console.error(err)
        throw new InternalServerError() 
    }

    res.status(201).send('inserted new user')
}))

app.post('/create-transaction', authenticateToken, (req, res) => handleRequest({ res }, async() => {
    console.log(req.user)
    const transaction = new Transaction({
        expenseType: 'coffee', 
        cost: 5.35, 
        userID: `${req.user.userID}`
    });

    await transaction.save();
    res.status(200).send('transaction created')
}))

app.get('/get-user', authenticateToken, (req, res) => handleRequest({ res }, async () => {
    const { username } = req.user.data;
    const user = await User.find({ username })
    res.status(200).send(user)
}))

app.get('/get-transactions', async (req, res) => {
    console.log(req.headers.userid)
    const transactions = await Transaction.find({userID: req.headers.userid})
    res.status(200).send(transactions)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
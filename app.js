const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

const app = express()

app.use(bodyParser.json()) // application-json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/users', userRoutes)

mongoose
    .connect(
        'mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080)})
    .catch(err => console.log(err))
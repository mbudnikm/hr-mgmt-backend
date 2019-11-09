const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const accessRoutes = require('./routes/access')
const employeeRoutes = require('./routes/employee')
const projectRoutes = require('./routes/project')
const archiveRoutes = require('./routes/archive')

const app = express()

app.use(bodyParser.json()) // application-json
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/users', userRoutes)
app.use('/access', accessRoutes)
app.use('/employees', employeeRoutes)
app.use('/projects', projectRoutes)
app.use('/archive', archiveRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

mongoose
    .connect(
        'mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080)})
    .catch(err => console.log(err))
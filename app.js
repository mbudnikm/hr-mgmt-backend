const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const uuid = require('uuid/v4')

const userRoutes = require('./routes/user')
const accessRoutes = require('./routes/access')
const employeeRoutes = require('./routes/employee')
const projectRoutes = require('./routes/project')
const archiveRoutes = require('./routes/archive')
const assessmentRoutes = require('./routes/assessment')
const trainingRoutes = require('./routes/training')
const documentRoutes = require('./routes/document')

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@hr-zgxte.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

const app = express()

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'data');
    },
    filename: function(req, file, cb) {
        cb(null, uuid()+ "+" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if ( 
        ext === '.png' || 
        ext === '.jpg' || 
        ext === '.jpeg' ||
        ext === '.doc' ||
        ext === ".docx" ||
        ext === ".pdf" ||
        ext === ".ppt" ||
        ext === ".pptx"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json()) // application-json
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('path'))
app.use('/documents', express.static(path.join(__dirname, 'documents')))

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
app.use('/assessments', assessmentRoutes)
app.use('/trainings', trainingRoutes)
app.use('/documents', documentRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

mongoose.set('useFindAndModify', false);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 8080)})
    .catch(err => console.log(err))
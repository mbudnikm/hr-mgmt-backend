const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assessmentSchema = new Schema({
    employee_id: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
    },
    year: {
        type: Date,
    },
    period: {
        type: String,
    },
    assessment_comment: {
        type: String,
    }
})

module.exports = mongoose.model('Assessment', assessmentSchema)
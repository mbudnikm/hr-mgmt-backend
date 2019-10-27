const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    project_name: {
        type: String,
        required: true
    },
    project_description: {
        type: String,
    },
    project_start_date: {
        type: Date,
    },
    project_end_date: {
        type: Date,
    },
    project_comments: {
        type: Date,
    },
    employees: {
        type: Array,
    }
})

module.exports = mongoose.model('Project', projectSchema)
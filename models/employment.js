const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employmentSchema = new Schema({
    job_position: {
        type: String,
        default: null
    },
    contract_type: {
        type: String,
        default: null
    },
    basis_brutto: {
        type: String,
        default: null
    },
    employment_start_date: {
        type: Date,
        default: null
    },
    contract_end_date: {
        type: Date,
        default: null
    },
    hired_by: {
        type: String,
        default: null
    },
    bonuses: {
        type: String,
        default: null
    },
    employment_comments: {
        type: String,
        default: null
    }
})

module.exports = employmentSchema
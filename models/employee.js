const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection("mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority")

autoIncrement.initialize(connection)

const addressSchema = require('./address')
const contactSchema = require('./contact')
const profileSchema = require('./profile')
const employmentSchema = require('./employment')

const employeeSchema = new Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        required: true
    },
    pesel: {
        type: Number,
        required: true
    },
    archive_id: {
        type: Number
    },
    contact: {
        type: contactSchema,
        default: {},
    },
    profile: {
        type: profileSchema,
        required: true,
        default: {},
    },
    address: {
        type: addressSchema,
        default: {},
    },
    employment: { 
        type: employmentSchema, 
        default: {},
    }
})

employeeSchema.plugin(autoIncrement.plugin, {
    model: 'Employee',
    field: 'employee_id',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('Employee', employeeSchema, "employees")
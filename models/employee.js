const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection("mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority")

autoIncrement.initialize(connection)

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
    /*contact: {
        email: {
            type: String
        },
        business_tel: {
            type: String
        },
        private_tel: {
            type: String
        }
    },
    profile: {
        manager_id: {
            type: Number
        },
        job_position: {
            type: String
        },
        img: {
            type: String
        }
    },
    address: {
        postcode: {
            type: Number
        },
        city: {
            type: String
        },
        street: {
            type: String
        }
    },
    employment: {
        contract_type: {
            type: String
        },
        basis_brutto: {
            type: String
        },
        employment_start_date: {
            type: Date
        },
        contract_end_date: {
            type: Date
        },
        hired_by: {
            type: String
        },
        bonuses: {
            type: String
        },
        employment_comments: {
            type: String
        }
    }*/
})

employeeSchema.plugin(autoIncrement.plugin, {
    model: 'Employee',
    field: 'employee_id',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('Employee', employeeSchema, "employees")
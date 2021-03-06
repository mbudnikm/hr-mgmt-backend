const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')

const Employee = require('../models/employee')
const Access = require('../models/access')
const Archive = require('../models/archive')
const Assessment = require('../models/assessment')
const Training = require('../models/training')

exports.getUsers = (req, res, next) => {
    Employee
        .find()
        .then(employees => {
            res.status(200).json({users: employees.map(employee => ({
                _id: employee._id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                role_id: employee.role_id,
                employee_id: employee.employee_id
            }))})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.createUser = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Wprowadzone dane są niepoprawne.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role_id = req.body.role_id;
    const pesel = req.body.pesel;
    const archive_id = null
    const manager_id = req.body.manager_id;

    const employee = new Employee({
        firstname: firstname, 
        lastname: lastname,
        role_id: role_id,
        pesel: pesel,
        archive_id: archive_id,
        manager_id: manager_id
    })

    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const access = new Access({
                password: hashedPassword
            })
            return access.save() && employee.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Użytkownik został poprawnie dodany",
                employee: {
                    _id: result._id,
                    employee_id: result.employee_id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    role_id: result.role_id,
                    pesel: result.pesel,
                    manager_id: result.manager_id,
                }
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

    // RESET EMPLOYEE_ID

    
    /*userAccess
        .save( function(err) {
            userAccess.nextCount(function(err, count) {
                userAccess.resetCount(function(err, nextCount) {
                    console.log(nextCount)
                })
            })
        }) 
        
    user
        .save( function(err) {
            user.nextCount(function(err, count) {
                user.resetCount(function(err, nextCount) {
                    console.log(nextCount)
                })
            })
        })*/
    
    

    /*access
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Użytkownik został poprawnie stworzony",
                user: result
            })
        })
        .catch(err => {
            console.log(err)
        })*/
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId

    Employee.findOne({employee_id: userId})
        .then(user => {
            if(!user) {
                const error = new Error('Nie znaleziono użytkownika')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({user: user})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.deleteUser = (req, res, next) => {
    const employeeId = req.params.employeeId

    Access.findOne({employee_id: employeeId})
        .then(user => {
            if(!user) {
                const error = new Error('Nie znaleziono użytkownika')
                error.statusCode = 404
                throw error
            }
            Access.deleteOne({employee_id: employeeId})
            && Employee.findOneAndDelete({employee_id: employeeId})
            && (Archive.findOne({employee_id: employeeId}) && Archive.findOneAndDelete({employee_id: employeeId}))
            && (Assessment.findOne({employee_id: employeeId}) && Assessment.deleteMany({employee_id: employeeId}))
            && (Training.findOne({employee_id: employeeId}) && Training.deleteMany({employee_id: employeeId}))
                .then(user => {
                    res.status(200).json({message: "Usunięto poprawnie użytkownika"})
                })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.putUser = (req, res, next) => {
    const employeeId = req.params.employeeId

    const role_id = req.body.role_id
    const manager_id = req.body.manager_id

    const updatedUser = {
        role_id: role_id,
        manager_id: manager_id
    }

    Employee
        .findOneAndUpdate(
            {employee_id: employeeId},
            updatedUser,
            {new: true})
        .then(user => {
            if(!user) {
                const error = new Error('Wystąpił błąd! Nie udało zmienić się danych użytkownika.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({
                user: {
                    employee_id: user.employee_id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role_id: user.role_id,
                    manager_id: user.manager_id
                }
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                    err.statusCode = 500
                }
                next(err)
        })
}
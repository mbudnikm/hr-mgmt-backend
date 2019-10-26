const { validationResult } = require('express-validator/check')

const Employee = require('../models/employee')
const Access = require('../models/access')

exports.getUsers = (req, res, next) => {
    Employee
        .find()
        .then(users => {
            res.status(200).json({employees: employees})
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

    const password = req.body.password;

    const user = new Employee({
        firstname: firstname, 
        lastname: lastname,
        role_id: role_id,
        pesel: pesel,
        archive_id: archive_id
    })

    const access = new Access({
        password: password
    })

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
    

    access
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
        })

    user
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Użytkownik został poprawnie stworzony",
                user: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
        })
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId
    User.findOne({employee_id: userId})
    .then(user => {
        console.log("success")
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
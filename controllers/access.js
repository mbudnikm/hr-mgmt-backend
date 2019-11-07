const Access = require('../models/access')
const Employee = require('../models/employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
    const employee_id = req.body.employee_id
    const password = req.body.password
    let loadedUser;
    let loadedUserRole;

    Access.findOne({employee_id: employee_id})
        .then(user => {
            if(!user) {
                const error = new Error('Użytkownik o podanym id pracownika nie istnieje')
                error.statusCode = 401;
                throw error
            }
            loadedUser = user
            Employee.findOne({employee_id: employee_id})
                .then(employee => {
                    loadedUserRole = employee.role_id
                })
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wprowadzone hasło jest niepoprawne')
                error.statusCode = 401
                throw error
            }

            const token = jwt.sign({
                employee_id: loadedUser.employee,
                role_id: loadedUserRole
            }, 
            'secret', 
            { expiresIn: '1h' })

            res.status(200).json({
                token: token, 
                employee_id: loadedUser.employee_id,
                role_id: loadedUserRole
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.changePassword = (req, res, next) => {
    const employeeId = req.params.employeeId
    const password = req.body.password

    bcrypt.hash(password, 12)
        .then(hashedPassword => 
            Access.findOneAndUpdate(
                {employee_id: employeeId}, 
                {password: hashedPassword},
                {new: true}))
        .then(user => {
            if(!user) {
                const error = new Error('Nie znaleziono użytkownika')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({message: "Hasło zostało zmienione poprawnie"})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

}
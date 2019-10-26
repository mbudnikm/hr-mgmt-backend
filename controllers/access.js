const Access = require('../models/access')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
    const employee_id = req.body.employee_id
    const password = req.body.password
    let loadedUser;

    Access.findOne({employee_id: employee_id})
        .then(employee => {
            if(!employee) {
                const error = new Error('Użytkownik o podanym id pracownika nie istnieje')
                error.statusCode = 401;
                throw error
            }
            loadedUser = employee
            return bcrypt.compare(password, employee.password)
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wprowadzone hasło jest niepoprawne')
                error.statusCode = 401
                throw error
            }

            const token = jwt.sign({
                employee_id: loadedUser.employee,
            }, 
            'secret', 
            { expiresIn: '1h' })

            res.status(200).json({
                token: token, 
                employee_id: loadedUser.employee_id
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}
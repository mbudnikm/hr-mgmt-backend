const express = require('express')
const { body } = require('express-validator/check')

const userController = require('../controllers/user')

const Employee = require('../models/employee')

const router = express.Router()

// GET /users
router.get('/', userController.getUsers)

// POST /users
router.post(
    '/', 
    [
        body('firstname')
            .trim()
            .isLength({ min: 3 }),
        body('lastname')
            .trim()
            .isLength({ min: 3 }),
        body('pesel')
            .custom((value, { req }) => {
                return Employee.findOne({pesel: value}).then(employeeDoc => {
                    if(employeeDoc) {
                        console.log("PROMISE REJECTED")
                        return Promise.reject('Użytkownik o podanym peselu istnieje w bazie danych')
                    }
                })
            }),
        body('password')
            .trim()
            .isLength({min: 8})
    ], 
    userController.createUser
)
router.get('/:userId', userController.getUser)

module.exports = router
const express = require('express')
const { body } = require('express-validator/check')

const userController = require('../controllers/user')

const Employee = require('../models/employee')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /users
router.get('/', isAuth, userController.getUsers)

// POST /users
router.post(
    '/', 
    isAuth,
    [
        body('firstname')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Imię powinno mieć minimum 3 znaki'),
        body('lastname')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Nazwisko powinno mieć minimum 3 znaki'),
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
            .withMessage('Hasło powinno mieć minimum 8 znaków'),
    ], 
    userController.createUser
)

// DELETE /users/:employeeId

router.delete('/:employeeId', isAuth, userController.deleteUser)

// PUT /users/:employeeId
router.put('/:employeeId', isAuth, userController.putUser)

// GET /users/:userId

// router.get('/:userId', isAuth, userController.getUser)

module.exports = router
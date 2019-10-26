const express = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/user')

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
        .isLength({ min: 3 })
    ]
    , 
    userController.createUser
)

module.exports = router
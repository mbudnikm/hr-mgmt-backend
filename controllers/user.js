const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.getUsers = (req, res, next) => {
    res.status(200).json({
        users: [
            { 
                employee_id: 000001,
                firstname: "Marta",
                lastname: "Budnik",
                role_id: "manager",
                pesel: 11111111111
            },
        ]
    });
};

exports.createUser = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: "Wprowadzone dane są niepoprawne.",
            errors: errors.array()
        })
    }
    const employee_id = req.body.employee_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role_id = req.body.role_id;
    const pesel = req.body.pesel;

    const user = new User({
        firstname: firstname, 
        lastname: lastname,
        role_id: role_id,
        pesel: pesel
    })

    user.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Użytkownik został poprawnie stworzony",
            user: result
        })
    }).catch(err => {
        console.log(err)
    })
}
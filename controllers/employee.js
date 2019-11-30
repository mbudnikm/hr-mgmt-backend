const Employee = require('../models/employee')

exports.getManagerEmployees = (req, res, next) => {
    const managerId = req.params.managerId
    Employee
        .find({"manager_id": {$eq: managerId}})
        .then(employees => {
            res.status(200).json({employees: employees})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.getEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId
    Employee
        .find({"employee_id": employeeId})
        .then(employee => {
            res.status(200).json({employee})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.putEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const contact = req.body.contact
    const address = req.body.address
    const employment = req.body.employment

    const updatedEmployeeData = {
        firstname: firstname,
        lastname: lastname,
        contact: contact,
        address: [address],
        employment: [employment]
    }
    
    Employee
        .findOneAndUpdate(
            {employee_id: employeeId},
            updatedEmployeeData,
            {new: true})
            .then(employee => {
                if(!employee) {
                    const error = new Error('Wystąpił błąd! Nie udało zmienić się danych pracownika.')
                    error.statusCode = 404
                    throw error
                }
                res.status(200).json({employee})
            })
            .catch(err => {
                if(!err.statusCode) {
                        err.statusCode = 500
                    }
                    next(err)
            })

}
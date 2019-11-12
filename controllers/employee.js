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
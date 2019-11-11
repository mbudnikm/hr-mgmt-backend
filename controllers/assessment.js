const Assessment = require('../models/assessment')

exports.getEmployeeAssessments = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Assessment
        .find({employee_id: employeeId})
        .then(result => {
            res.status(200).json({assessments: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};
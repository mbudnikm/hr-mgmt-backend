const Training = require('../models/training')

exports.getEmployeeTrainings = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Training
        .find({employee_id: employeeId})
        .then(projects => {
            res.status(200).json({projects: projects})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};
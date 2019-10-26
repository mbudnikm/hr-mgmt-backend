const Access = require('../models/access')

exports.getAccess = (req, res, next) => {
    const employee_id = req.body.employee_id
    const password = req.body.password
}
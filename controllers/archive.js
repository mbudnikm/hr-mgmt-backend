const Archive = require('../models/archive')
const Employee = require('../models/employee')

exports.getArchive = (req, res, next) => {
    Archive
        .find()
        .then(result => {
            res.status(200).json({archive: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.postArchive = (req, res, next) => {
    const employee_id = req.body.employee_id
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const archiveEmployee = new Archive({
        employee_id: employee_id,
        firstname: firstname,
        lastname: lastname
    })

    Employee.findOneAndUpdate(
        {employee_id: employeeId}, 
        {archive_id: employeeId},
        {new: true})
    && archiveEmployee
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Pracownik został przeniesiony do archiwum danych",
                archive: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteArchive = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Employee.findOneAndUpdate(
        {employee_id: employeeId}, 
        {archive_id: null},
        {new: true})
    && Archive.findOneAndRemove({employee_id: employeeId})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Pracownik został usunięty z archiwum danych",
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
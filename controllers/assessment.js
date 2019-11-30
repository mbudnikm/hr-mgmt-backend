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



exports.postAssessment = (req, res, next) => {
    const employee_id = req.body.employee_id
    const value = req.body.value
    const year = req.body.year
    const period = req.body.year
    const assessment_comment = req.body.assessment_comment

    const assessment = new Assessment({
        employee_id: employee_id,
        value: value,
        year: year,
        period: period,
        assessment_comment: assessment_comment
    })

    assessment
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Ocena została dodana",
                assessment: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}


exports.deleteAssessment = (req, res, next) => {
    const assessmentId = req.params.assessmentId
    Assessment.findById(assessmentId)
        .then(result => {
            if(!result) {
                const error = new Error("Nie znaleziono oceny")
                next(error)
                throw Error
            }
            res.status(200).json({
                message: "Ocena została usunięta",
            })
            return Assessment.deleteOne({_id: assessmentId})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
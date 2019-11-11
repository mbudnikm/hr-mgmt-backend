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

exports.putProject = (req, res, next) => {
    const projectId = req.params.projectId
    const project_name = req.body.project_name
    const project_description = req.body.project_description
    const project_start_date = req.body.project_start_date
    const project_end_date = req.body.project_end_date
    const project_comments = req.body.project_comments
    const employees = req.body.employees
    const updatedProject = {
        project_name: project_name,
        project_description: project_description,
        project_start_date: project_start_date,
        project_end_date: project_end_date,
        project_comments: project_comments,
        employees: employees
    }
    Project
        .findOneAndUpdate(
            {_id: projectId},
            updatedProject,
            {new: true})
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postTraining = (req, res, next) => {

    const employee_id = req.body.employee_id
    const training_name = req.body.training_name
    const training_status = req.body.training_status
    const training_date = req.body.training_date
    const training_cost = req.body.training_cost
    const training_comments = req.body.training_comments

    const training = new Training({
        employee_id: employee_id,
        training_name: training_name,
        training_status: training_status,
        training_date: training_date,
        training_cost: training_cost,
        training_comments: training_comments
    })

    training
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Szkolenie zostało dodane",
                training: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteTraining = (req, res, next) => {
    const trainingId = req.params.trainingId;
    Training.findByIdAndRemove(trainingId)
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Szkolenie zostało usunięte",
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
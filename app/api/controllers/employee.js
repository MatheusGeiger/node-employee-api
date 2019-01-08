const mongoose = require('mongoose');
const Employee = require('../models/employee');
const isValidEmployee = require('../validations/employee');

const filters = {
    firstName: (firstName) => {
        return { 'firstName': { $regex: new RegExp(firstName, 'i') } };
    }
};

exports.create = async (req, res) => {
    console.log(`POST [EMPLOYEE] - Creating Employee`)
    let validationEmployee = isValidEmployee(req.body, 'add');
    if (validationEmployee.status === 'success') {
        let employee = new Employee({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            participation: req.body.participation,
            createdAt: new Date()
        });

        employee.save()
            .then(result => {
                console.log(`POST [EMPLOYEE] - Employee Created`)
                res.status(201).json({ message: 'Employee created', result: result });
            })
            .catch(err => {
                console.log(`POST [EMPLOYEE] - Error to create Employee - ${JSON.stringify(err)}`)                
                res.status(500).json({ error: err })
            });
    } else {
        console.log(`POST [EMPLOYEE] - Bad Request to create - Error ${validationEmployee.error}`);
        res.status(400).json({ error: JSON.parse(validationEmployee.error) });
    }
};

exports.findEmployees = (req, res) => {
    console.log(`GET [EMPLOYEE] - Getting Employee`)

    let { firstName, indexof, limit } = req.query; // eslint-disable-line no-unused-vars 

    if (firstName) {
        Employee.find(filters.firstName(firstName))
            .sort({ createdAt: -1 })
            .exec()
            .then(employees => res.status(200).json(employees))
            .catch(err => res.status(500).json({ error: err }));
    } else {
        Employee.find()
            .exec()
            .then(employees => res.status(200).json(employees))
            .catch(err => res.status(500).json({ error: err }));
    }
};

exports.findEmployeeById = (req, res) => {
    console.log(`GET [EMPLOYEE] - Getting Employee By id ${req.params.id}`)
    Employee.findById({ _id: req.params.id })
        .exec()
        .then(employees => res.status(200).json(employees))
        .catch(err => res.status(500).json({ error: err }));
};

exports.update = (req, res) => {
    console.log(`PUT [EMPLOYEE] - Updating ${req.body.firstName}`);
    let validationEmployee = isValidEmployee(req.body, 'update');
    if (validationEmployee.status === 'success') {
        const updateOps = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'participation': req.body.participation,
            'updatedAt': new Date()
        };

        Employee.updateOne({ _id: req.params.id }, { $set: updateOps })
            .then(res => {
                console.log(`PUT [EMPLOYEE] - Createdr ${req.body.firstName}`);
                res.status(202).json({ message: 'Updated' })
            })
            .catch(err => res.status(500).json({ error: err }));
    } else {
        console.log(`PUT [EMPLOYEE] - Invalid request ${validationEmployee.error}`);
        res.status(400).json({ error: JSON.parse(validationEmployee.error) });
    }
};

exports.delete = (req, res) => {
    console.log(`DELETE [EMPLOYEE] - Deleting ${req.params.id}`);
    Employee.find({ _id: req.params.id })
        .remove()
        .exec()
        .then(res.status(202).json({ message: 'Deleted' }))
        .catch(err => res.status(500).json({ error: err }));
};
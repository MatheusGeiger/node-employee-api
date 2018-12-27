const mongoose = require('mongoose');
const Employee = require('../models/employee');
const isValidEmployee = require('../validations/employee');

const filters = {
    firstName: (firstName) => {
        return { 'firstName': { $regex: new RegExp(firstName, 'i') } };
    }
};

exports.create = async (req, res) => {
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
                res.status(201).json({ message: 'Employee created', result: result });
            })
            .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: JSON.parse(validationEmployee.error) });
    }
};

exports.findEmployees = (req, res) => {
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
    Employee.findById({ _id: req.params.id })
        .exec()
        .then(employees => res.status(200).json(employees))
        .catch(err => res.status(500).json({ error: err }));
};

exports.update = (req, res) => {
    let validationEmployee = isValidEmployee(req.body, 'update');
    if (validationEmployee.status === 'success') {
        const updateOps = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'participation': req.body.participation,
            'updatedAt': new Date()
        };

        Employee.updateOne({ _id: req.params.id }, { $set: updateOps })
            .then(res.status(202).json({ message: 'Updated' }))
            .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: JSON.parse(validationEmployee.error) });
    }
};

exports.delete = (req, res) => {
    Employee.find({ _id: req.params.id })
        .remove()
        .exec()
        .then(res.status(202).json({ message: 'Deleted' }))
        .catch(err => res.status(500).json({ error: err }));
};
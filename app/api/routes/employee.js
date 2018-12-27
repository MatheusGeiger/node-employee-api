const express = require('express');
const router = express.Router();
var VerifyToken = require('../validations/request');

const EmployeeController = require('../controllers/employee');

/**
 * Endpoint to create a new Employee
 * @method POST
 */
router.post('/', VerifyToken, EmployeeController.create);

/**
 * Endpoint to find all Employees
 * @method GET
 */
router.get('/', EmployeeController.findEmployees);

/**
 * Endpoint to find Employee by id
 * @method GET
 */
router.get('/:id', EmployeeController.findEmployeeById);

/**
 * Endpoint to update a Employee
 * @method PUT
 * @param id
 */
router.put('/:id', VerifyToken, EmployeeController.update);

/**
 * Endpoint to delete a Employee
 * @method DELETE
 * @param id
 */
router.delete('/:id', VerifyToken, EmployeeController.delete);


module.exports = router;
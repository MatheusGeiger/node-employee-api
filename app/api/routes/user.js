const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

/**
 * Endpoint to create a new User
 * @method POST
 */
router.post('/', UserController.create);

/**
 * Endpoint to find all Users
 * @method GET
 */
router.get('/', UserController.findUsers);

/**
 * Endpoint to find User by id
 * @method GET
 */
router.get('/:id', UserController.findUserById);

/**
 * Endpoint to update a User
 * @method PUT
 * @param id
 */
router.put('/:id', UserController.update);

/**
 * Endpoint to delete a User
 * @method DELETE
 * @param id
 */
router.delete('/:id', UserController.delete);


module.exports = router;
const usersController = require("../../controllers/usersController");
var express = require('express');
var userRoutes = express.Router();
const schemas = require('../../config/validationSchema');
const verifyParams = require("../../middleware/verifyParams");

userRoutes
    .get('/', usersController.index)
    .get('/list', usersController.getAllUsers)
    .get('/id/:id', usersController.getUser)
    .post('/createUser', verifyParams.validateParams(schemas.users), usersController.createUser)
    .patch('/update/:id', usersController.updateUser)
    .delete('/delete/:id', usersController.deleteUser)
    .delete('delete/all', usersController.deleteAllUser)

module.exports = userRoutes

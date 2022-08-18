const usersController = require("../../controllers/usersController");
var express = require('express');
var userRoutes = express.Router();

userRoutes
    .get('/', usersController.index)
    .get('/list', usersController.getAllUsers)
    .get('/_id/:id', usersController.getUser)
    .post('/', usersController.createUser)
    .patch('/update/:id', usersController.updateUser)
    .delete('/delete/:id', usersController.deleteUser)

module.exports = userRoutes
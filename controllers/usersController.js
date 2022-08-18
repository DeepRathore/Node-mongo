'use strict'
var resCodes = require('http-status-codes')
var userService = require('../services/users')

exports.index = function(req, res){
    res.render('users');
};

// http://localhost:4200/users/_id/62f7726defe19258e0b2f1fb
exports.getUser = function(req, res) {
  userService.getUserById(req.params.id).then((user) => {
      console.log(user);
      if (!user) {
        res.send('User not found');
      } else {

        res.status(resCodes.StatusCodes.OK).render('user_details', {user: user});
      }
  })
};

// http://localhost:4200/users?data
exports.createUser = function(req, res) {
  if (!req.query.username) {
    res.sendStatus(resCodes.StatusCodes.BAD_REQUEST);
  }
  userService.createUser(req.query).then((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.status(resCodes.StatusCodes.CREATED).send(user);
    }
  });
};

// delete
exports.deleteUser = function(req, res) {
  userService.deleteUserById(req.params.id).then((user) => {
    res.status(resCodes.StatusCodes.OK).send(user);
  });
};

// update
exports.updateUser = function(req, res) {
  userService.updateUserById(req.params.id).then((user) => {
    res.send(user);
  });
};

// http://localhost:4200/users/list
exports.getAllUsers = function(req, res) {
  userService.usersList().then((usersList) => {
      if (!usersList) {
        res.send('Users list not found');
      } else {
        res.status(resCodes.StatusCodes.OK).send(usersList);
      }
  });
};

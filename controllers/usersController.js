'use strict'
var resCodes = require('http-status-codes')
var userService = require('../services/users');
const axios = require("axios");

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
        console.log('successful');
        res.status(resCodes.StatusCodes.OK).render('user_details', {user: user});
      }
  })
};

// http://localhost:4200/users?data
exports.createUser = function(req, res) {
  console.log(req.body.username);
  if (!req.body.username) {
    res.sendStatus(resCodes.StatusCodes.BAD_REQUEST);
  }
  userService.createUser(req.body).then((err, user) => {
    console.log('running')
    if (err) {
      res.send(err);
    } else {
      res.status(resCodes.StatusCodes.CREATED).send(user);
    }
  });
};

// delete
exports.deleteUser = function(req, res) {
  console.log('in delete user');
  userService.deleteUserById(req.params.id).then(() => {
    res.status(resCodes.StatusCodes.OK).send('User is delete');
  });
};

exports.deleteAllUser = function(req, res) {
  userService.deleteAllUsers().then(() => {
    res.status(resCodes.StatusCodes.OK).send('All users deleted');
  });
};

// update
exports.updateUser = function(req, res) {
  userService.updateUserById(req.params.id, req.body).then((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.status(resCodes.StatusCodes.OK).send('user is updates successfull');
    }
  });
};

// http://localhost:4200/users/list
exports.getAllUsers = function(req, res) {
  // userService.usersList().then((usersList) => {
  //     if (!usersList) {
  //       res.send('Users list not found');
  //     } else {
  //       res.status(resCodes.StatusCodes.OK).send(usersList);
  //     }
  // });

  axios.get('https://fakestoreapi.com/users')
  .then((response) => {
    res.status(resCodes.StatusCodes.OK).send(response.data);
  }).catch((response) => {
    res.status(resCodes.StatusCodes.BAD_REQUEST).send(response);
  })
};

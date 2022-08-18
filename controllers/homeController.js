'use strict'
var resCodes = require('http-status-codes')
const redis = require('ioredis');
const client = new redis();


exports.index = function(req, res){
  client.set('restricted_user', JSON.stringify({"userName": "abc123"}));
  res.render('index', { title: 'Home Page Of App' });
};

exports.allAccess = (req, res) => {
  res.status(resCodes.StatusCodes.OK).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(resCodes.StatusCodes.OK).send("User Content only.");
};


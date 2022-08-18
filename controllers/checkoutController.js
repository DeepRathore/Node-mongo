'use strict'
var resCodes = require('http-status-codes')

exports.index = function(req, res){
    res.render('checkout');
};

exports.update = function(req, res){
    res.send('post method of checkout')
};
const checkoutController = require("../../controllers/checkoutController");
var express = require('express');
var checkoutroutes = express.Router();

checkoutroutes.get('/', checkoutController.index);

checkoutroutes.post('/', checkoutController.index);

module.exports = checkoutroutes
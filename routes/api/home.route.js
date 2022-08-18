const homeController = require("../../controllers/homeController");
var express = require('express');
var homeroutes = express.Router();
const authJwt = require("../../middleware/authJWT");


homeroutes.get('/', homeController.index);
homeroutes.get('/all', homeController.allAccess);
// homeController.get('/userOnly', [authJwt.verifyToken], homeController.userBoard)

module.exports = homeroutes
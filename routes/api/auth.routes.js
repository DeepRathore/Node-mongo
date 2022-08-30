const authController = require("../../controllers/authController");
const { verifySignUp } = require("../../middleware");
var express = require('express');
var authRoutes = express.Router();
const schemas = require('../../config/validationSchema');
const verifyParams = require("../../middleware/verifyParams");

authRoutes
    .post('/signup', verifyParams.validateParams(schemas.users), authController.signup)
    .post('/signin', authController.signin)
    .post('/signout', authController.signout)

module.exports = authRoutes

const authController = require("../../controllers/authController");
const { verifySignUp } = require("../../middleware");
var express = require('express');
var authRoutes = express.Router();

// authRoutes.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], () => {
//     authController.signup
// })

authRoutes
    .post('/signup', verifySignUp.checkDuplicateUsernameOrEmail, authController.signup)
    .post('/signin', authController.signin)
    .post('/signout', authController.signout)


module.exports = authRoutes

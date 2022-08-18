var express = require('express');
var router = express.Router();
var homeRoute = require('./api/home.route');
var checkoutRouter = require('./api/checkout.route');
var usersRouter = require('./api/users.route');
var productRouter = require('./api/products.route');
var authRouter = require('./api/auth.routes');
// const { verifySignUp } = require("../middleware");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
}); 
router.use('/',  homeRoute)
router.use('/products', productRouter)
router.use('/checkout', checkoutRouter)
router.use('/users', usersRouter)
router.use('/auth', authRouter)

module.exports = router;
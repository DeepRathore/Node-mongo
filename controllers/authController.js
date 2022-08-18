var resCodes = require('http-status-codes');
const config = require("../config/auth.config");
const User = require("../models/users.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// http://localhost:4200/auth/signup
//http://localhost:4200/auth/signup?name=demo&username=demo12&email=demo@gmail.com&password=demo = already used
exports.signup = (req, res) => {
  var encryptedPass;

  bcrypt.hash(req.query.password, saltRounds).then(function(hash) {
    encryptedPass = hash;
  });

  const user = new User({
    name: req.query.name,
    username: req.query.username,
    email: req.query.email,
    password: encryptedPass
  });

  user.save((err, user) => {
    if (err) {
      res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: err });
      return;
    }
    else {
      res.status(resCodes.StatusCodes.OK).send(`sucessfully signed up ${user.name}`);
    }
  })
}

// http://localhost:4200/auth/signin
exports.signin = (req, res) => {
  User.findOne({
    username: req.query.username,
  }).exec((err, user) => {
    if (err) {
      res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.query.password,
      user.password
    );

    // validate password
    if (req.query.password != user.password) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // SET TOKEN
    // var token = jwt.sign({ id: user._id }, config.secret, {
    //   expiresIn: 86400, // 24 hours
    // });

    // req.session.token = token;

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  });
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
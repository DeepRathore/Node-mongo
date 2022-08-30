var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const User = require("../models/users.model");
var saltRounds = 10; 
var encryptedPass;
var resCodes = require('http-status-codes');
var userService = require('../services/users');
var axios = require('axios');


//http://localhost:4200/auth/signup?name=demo&username=demo12&email=demo@gmail.com&password=demo = already used
exports.signup = (req, res) => {
  // call create user api
  var params = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  // userService.createUser(params).then((err, res) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.status(resCodes.StatusCodes.CREATED).send(user);
  //   }
  // })

  axios.post('http://localhost:4200/users/createUser', params).then(function (response) {
    res.status(resCodes.StatusCodes.OK).send(`sucessfully signed up - ${response.data}`);
  }).catch(function (error) {
    res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: error });
  });
}

// http://localhost:4200/auth/signin
exports.signin = (req, res) => {
  const param = {
    username: req.body.username
  }
  userService.findUser(param).then((user) => {
    console.log(user);
    if (!user) {
      res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: 'user not found' });
      return;
    } else {

      // validate password
      if ((req.body.password).replace(/\s/g, '') != (user.password).replace(/\s/g, '')) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
      });
      res.status(resCodes.StatusCodes.OK).render('user_details', {user: user});
    }
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

// sign in 
// bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
//   encryptedPass = hash;
// });

// var passwordIsValid = bcrypt.compareSync(
//   encryptedPass,
//   user.password
// );

// SET TOKEN
// var token = jwt.sign({ id: user._id }, config.secret, {
//   expiresIn: 86400, // 24 hours
// });

// req.session.token = token;



// post axious 
// try {
//   let response = await axios({
//       method: "POST",
//       url: "http://localhost:4200/users"
//   });
//   res.status(resCodes.StatusCodes.OK).send(`sucessfully signed up - ${response.data}`);
// } catch (err) {
//     res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: error });
//     return;
// }
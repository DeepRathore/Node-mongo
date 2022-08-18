const User = require("../models/users.model");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // username
  console.log(req.query.username);
  User.findOne({
    username: req.query.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      console.log('user exist');
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
  })

  // email
  User.findOne({
    email: req.query.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  })
}

module.exports = {
  checkDuplicateUsernameOrEmail
}
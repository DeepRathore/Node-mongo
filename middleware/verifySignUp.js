const db = require("../models");
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // username
  console.log(req.body.username);
  User.findOne({ where: {username: req.body.username} }).exec((err, user) => {
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
  User.findOne({ where: {email: req.body.email} }).exec((err, user) => {
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
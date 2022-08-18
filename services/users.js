// const httpStatus = require('http-status');
const User = require('../models/users.model');


const createUser = async (userBody) => {
  return User.create(userBody);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const usersList = async () => {
  User.find().then((usersList) => {
    return usersList;
  });
};

const updateUserById = async (uId, updateBody) => {
 getUserById(uId).then((user) => {
    Object.assign(user, updateBody);
    user.save().then(() => {
        console.log(user + " is updated");
        return user;
    });
 });
}

const deleteUserById = (uId) => {
  getUserById(uId).then((user) => {
    user.remove().then(() => {
      console.log(user + " is deleted");
      return user;
  });
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  usersList
};

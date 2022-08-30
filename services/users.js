// const httpStatus = require('http-status');
// const User = require('../models/users.model');
const db = require("../models");
const User = db.users;
const {sequelize} = require('../models/index')

const createUser = async (userBody) => {
  console.log(userBody);
  // return User.create(userBody);

  const { name, username, password, email, phone, Language } = userBody;

  try {
    const user = await sequelize.transaction(async (t) => {
      await User.create({
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
        Language: Language
      }, { transaction: t });
    });
    return user;
  } catch (error) {
      console.log(error);
      console.log('transaction aborted');
  } 
};

const getUserById = async (id) => {
  return User.findByPk(id, { raw : true });
};

const findUser = (params) => {
  return User.findOne({ where: params });
}

const usersList = async () => {
  User.findAll().then((usersList) => {
    return usersList;
  });
};

const updateUserById = async (uId, updateBody) => {
  User.update(updateBody, {where: { id: uId }})
}

const deleteUserById = (uId) => {
  User.destroy({where: { id: uId }})
};

const deleteAllUsers = () => {
  User.destroy({where: {}});
}

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  usersList,
  findUser,
  deleteAllUsers
};

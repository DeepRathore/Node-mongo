module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Language: {
      type: Sequelize.JSON
    },
    // createdAt: {
    //   type: Sequelize.JSON
    // },
    // updatedAt: {
    //   type: Sequelize.JSON
    // }
  },
  {
    timestamps: false
  }
  );

  return User;
};



// const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:');
// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.TEXT,
//   },
//   username: {
//     type: DataTypes.TEXT
//   },
//   password: {
//     type: DataTypes.TEXT,
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: DataTypes.TEXT
//   }
// });

// module.exports = User;

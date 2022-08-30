const dbConfig = require("../config/db.config");
// var sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/yourdbname");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: true
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./users.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);

module.exports = db;

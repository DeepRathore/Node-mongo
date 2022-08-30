module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    rating: {
      type: Sequelize.NUMBER
    }
  });

  return Product;
};



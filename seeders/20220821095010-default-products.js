'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name: 'Initial Product',
      description: 'This is demo',
      price: 123,
      rating: 3.7,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', { }, {});
  }
};

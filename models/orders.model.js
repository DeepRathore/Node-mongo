const mongoose = require('mongoose');
// const { toJSON } = require('./plugins');

var orderSchema = mongoose.Schema({
  item: String,
  description: String,
  instock: Number
});


var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;

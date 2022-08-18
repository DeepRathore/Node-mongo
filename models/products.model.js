const mongoose = require('mongoose');
// const { toJSON } = require('./plugins');

var productSchema = mongoose.Schema({
  title: String,
  type: String,
  description: String,
  filename: String,
  height: Number,
  width: Number,
  price: Number,
  rating: Number
});

// add plugin that converts mongoose to json
// productSchema.plugin(toJSON);


var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;

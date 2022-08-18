'use strict'
var resCodes = require('http-status-codes')
const Order = require("../models/orders.model");
const Product = require("../models/products.model")
var productService = require('../services/products')

exports.index = function(req, res){
    res.render('products');
};

// http://localhost:4200/products/_id/62f2a9d8029b0c3641c7e1b1
exports.getProduct = function(req, res) {
  productService.getProductById(req.params.id).then((product) => {
      console.log(product);
      if (!product) {
        res.send('Product not found');
      } else {
        res.status(resCodes.StatusCodes.OK).render('product_details', {product: product});
      }
  })
};

// http://localhost:4200/products?title="Apple Juice"&type=food&description="Containing juice"&price=70&rating=3.3
exports.createProduct = function(req, res) {
  if (!req.query.title) {
    res.sendStatus(resCodes.StatusCodes.BAD_REQUEST);
  }
  productService.createProduct(req.query).then((product) => {
    res.status(resCodes.StatusCodes.CREATED).send(product);
  });
};

// delete
exports.deleteProduct = function(req, res) {
  productService.deleteProductById(req.params.id).then((product) => {
    res.status(resCodes.StatusCodes.OK).send(product);
  });
};

// update
exports.updateProduct = function(req, res) {
  productService.updateProductById(req.params.id).then((product) => {
    res.send(product);
  });
};

// http://localhost:4200/products/list
exports.getAllProduct = function(req, res) {
  productService.productsList().then((productsList) => {
      if (!productsList) {
        res.send('Products list not found');
      } else {
        res.status(resCodes.StatusCodes.OK).send(productsList);
      }
  });
};


// find all products and orders
// http://localhost:4200/products/getDetails
exports.getDetails = function(req, res) {

  Product.aggregate( [
    {
       $match: { 'rating': 4 }
    }
  ]).exec((err, result) => {
    if (err) {
      res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: err });
      return;
    } else {
      res.status(resCodes.StatusCodes.OK).send(result);
    }
  });

  Order.aggregate([
    {
    $lookup:
      {
        from: "products",
        localField: "item",
        foreignField: "title",
        as: "orders_docs"
      }
   }
 ]).exec((err, result) => {
  if (err) {
    res.status(resCodes.StatusCodes.BAD_REQUEST).send({ message: err });
    return;
  } else {
    res.status(resCodes.StatusCodes.OK).send(result);
  }
 });
}
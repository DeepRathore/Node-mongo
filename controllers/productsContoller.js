'use strict'
var resCodes = require('http-status-codes')
const Order = require("../models/orders.model");
const Product = require("../models/products.model")
var productService = require('../services/products');
const axios = require("axios");
const { func } = require('joi');

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
  productService.createProduct(req.body).then((product) => {
    res.status(resCodes.StatusCodes.CREATED).send(product);
  });
};

// delete
exports.deleteProduct = function(req, res) {
  productService.deleteProductById(req.params.id).then((product) => {
    res.status(resCodes.StatusCodes.OK).send(product);
  });
};

exports.deleteAllProducts = function(req, res) {
  userService.deleteAllProducts().then(() => {
    res.status(resCodes.StatusCodes.OK).send('All products deleted');
  });
};

// update
exports.updateProduct = function(req, res) {
  productService.updateProductById(req.params.id, req.body).then((product) => {
    res.send(product);
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


// with axious
http://localhost:4200/products/categories
exports.getAllCategories = function(req, res) {
  axios.get('http://localhost:4500/categories').then((response) => {
    console.log(response.data)
    res.status(resCodes.StatusCodes.OK).render('categories', { categories: response.data});
  }).catch((response) => {
    res.status(resCodes.StatusCodes.BAD_REQUEST).send(response);
  })
}


// http://localhost:4200/products/list
exports.getAllProduct = function(req, res) {
  // productService.productsList().then((productsList) => {
  //     if (!productsList) {
  //       res.send('Products list not found');
  //     } else {
  //       res.status(resCodes.StatusCodes.OK).send(productsList);
  //     }
  // });

  axios.get('https://fakestoreapi.com/products').then((response) => {
    res.status(resCodes.StatusCodes.OK).send(response.data);
  }).catch((response) => {
    res.status(resCodes.StatusCodes.BAD_REQUEST).send(response);
  })
};
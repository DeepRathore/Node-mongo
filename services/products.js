// const httpStatus = require('http-status');
const Product = require('../models/products.model');


const createProduct = async (productBody) => {
  return Product.create(productBody);
};

const getProductById = async (id) => {
  console.log(Product)
  return Product.findById(id);
};

const productsList = async () => {
  Product.find().then((productsList) => {
    return productsList;
  });
};

const updateProductById = async (pId, updateBody) => {
 getProductById(pId).then((product) => {
    Object.assign(product, updateBody);
    product.save().then(() => {
        console.log(product + " is updated");
        return product;
    });
 });
}

const deleteProductById = (pId) => {
  getProductById(pId).then((product) => {
    product.remove().then(() => {
      console.log(product + " is deleted");
      return product;
  });
  });
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  productsList
};

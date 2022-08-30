// const httpStatus = require('http-status');
const db = require("../models");
const Product = db.products;


const createProduct = async (productBody) => {
  return Product.create(productBody);
};

const getProductById = async (id) => {
  return Product.findByPk(id, { raw : true });
};

const findProduct = (params) => {
  return Product.findOne({ where: params });
}

const productsList = async () => {
  Product.find().then((productsList) => {
    return productsList;
  });
};

const updateProductById = async (uId, updateBody) => {
  Product.update(updateBody, {where: { id: uId }})
}

const deleteProductById = (uId) => {
  Product.destroy({where: { id: uId }})
};

const deleteAllProducts = () => {
  Product.destroy({where: {}});
}

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  productsList,
  deleteAllProducts,
  findProduct
};

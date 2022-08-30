const productsContoller = require("../../controllers/productsContoller");
var express = require('express');
var productroutes = express.Router();


productroutes
    .get('/', productsContoller.index)
    .get('/categories', productsContoller.getAllCategories)
    .get('/list', productsContoller.getAllProduct)
    .get('/_id/:id', productsContoller.getProduct)
    .post('/', productsContoller.createProduct)
    .patch('/update/:id', productsContoller.updateProduct)
    .delete('/delete/:id', productsContoller.deleteProduct)
    .get('/getDetails', productsContoller.getDetails)
    .delete('delete/all', productsContoller.deleteAllProducts)

module.exports = productroutes
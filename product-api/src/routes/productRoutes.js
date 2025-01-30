const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();
const productController = new ProductController();

router.get('/products/:id', (req, res) => productController.getProductById(req, res));

const setProductRoutes = (app) => {
  router.post('/products', productController.createProduct);
  router.get('/products', productController.getProducts);
  router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
  router.delete('/products/:id', productController.deleteProduct);

  app.use('/api', router);
};

module.exports = setProductRoutes;
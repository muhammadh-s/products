const express = require('express');
const productController = require('../controllers/productController');
const commonRouter = express.Router();
const authMiddleware = require('../middlewares/auth/index');
const userRole = require('../middlewares/auth/userRole');

commonRouter.post('/add', authMiddleware([userRole.SuperAdmin]), productController.addProduct);
commonRouter.post('/create', authMiddleware([userRole.SuperAdmin]), productController.createProduct);
commonRouter.post('/edit', authMiddleware([userRole.SuperAdmin]), productController.editProduct);
commonRouter.delete('/delete/:id', authMiddleware([userRole.SuperAdmin]), productController.deleteProduct);
commonRouter.get('/get', authMiddleware([userRole.SuperAdmin]), productController.getAllProducts);
commonRouter.get('/get/:id', authMiddleware([userRole.SuperAdmin]), productController.getProduct);

module.exports = commonRouter;

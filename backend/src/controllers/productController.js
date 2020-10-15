const productService = require('../services/productService');
const responseHandler = require('../middlewares/handlers/ResponseHandler');

const commonController = {
  editProduct: async function (req, res, next) {
    await productService.edit(req.body.id, req.body.name, req.body.color, req.body.details)
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  createProduct: async function (req, res, next) {
    await productService.create(
      req.body.name,
      req.body.color,
      req.body.details
    ).then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  deleteProduct: async function (req, res, next) {
    await productService.delete(req.params.id)
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  addProduct: async function (req, res, next) {
    await productService.add(req.body.id, req.body.qty)
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  getAllProducts: async function (req, res, next) {
    await productService.getAll()
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  getProduct: async function (req, res, next) {
    await productService.getOne(req.params.id)
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  }

};

module.exports = commonController;

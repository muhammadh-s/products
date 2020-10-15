const Product = require('../models/product');
const ErrorHandler = require('../middlewares/handlers/ErrorHandler');
const FailHandler = require('../middlewares/handlers/FailHandler');

module.exports = {
  /**
 * A function to update a prodct
 *
 * @param {String} id - product id
 * @param {String} name - product name
 * @param {String} color - product details
 * @param {String} color - product color
 *
 * @returns {Array} Return result
*/
  edit: async function (id, name, color, details) {
    const query = await Product.findByIdAndUpdate(id, {
      $set: {
        name,
        color,
        details
      }
    }, { new: true },
    function (err, parts) {
      if (err) return new ErrorHandler(500, 'Internal Server Error');
      return parts;
    }).lean();
    if (query == null) {
      throw new FailHandler(200, 'Cannot be updated at this time', 'Product update failed.');
    }
    return query;
  },
  /**
 * A function to add a product
 *
 * @param {String} id - id of the product
 * @param {Number} qty - quantity to add
 *
 * @returns {Array} Return result
*/
  add: async function (id, qty) {
    var query;
    if (qty === 1) {
      query = await Product.findByIdAndUpdate({ _id: id }, { $inc: { seq: 1 } },
        function (err, result) {
          if (err) return new ErrorHandler(500, 'Internal Server Error');
          return result;
        });
    } else {
      query = await Product.findByIdAndUpdate({ _id: id }, { $set: { stock: qty } },
        function (err, result) {
          if (err) return new ErrorHandler(500, 'Internal Server Error');
          return result;
        });
    }
    if (query == null) {
      throw new FailHandler(200, 'Product could not be added at this time.', 'Product addition failed');
    }
    return query;
  },
  /**
   * A function to create a product
   *
   * @param {String} name - product name
   * @param {String} color - product color
   * @param {String} details - product details
   *
   * @returns {Object} return error when exists
  */
  create: async function (name, color, details) {
    const doc = new Product({
      name,
      color,
      details
    });
    // save model to database
    var result = await doc.save(function (err, result) {
      if (err) throw new ErrorHandler(500, 'Internal Server Error');
      return result;
    });
    return result;
  },
  /**
   * A function to get all products
   *
   *
   * @returns {Array} return error when exists
  */
  getAll: async function () {
    const query = await Product.find({},
      function (err, result) {
        if (err) return new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean().select(['stock', 'name', 'color', 'createdAt']);
    if (query.length === 0) {
      throw new FailHandler(
        200,
        'No product found.',
        'Products are not found'
      );
    };
    return query;
  },
  /**
   * A function to get a product
   * @param {String} id - product id
   *
   * @returns {Array} return error when exists
  */
  getOne: async function (id) {
    const query = await Product.findById(id, {},
      function (err, result) {
        if (err) return new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean().select(['details']);
    if (query.length === 0) {
      throw new FailHandler(
        200,
        'No product found.',
        'Products are not found'
      );
    };
    return query;
  },
  /**
 * A function to delete a product
 *
 * @param {String} id - product id
 * @returns {Array} Return result
 *
*/
  delete: async function (id) {
    const query = await Product.findByIdAndDelete(id, {},
      function (err, result) {
        if (err) return new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean();
    if (query === null) {
      throw new FailHandler(
        200,
        'Product cannot be deleted this time.',
        'Product deletion failed.'
      );
    };
    return query;
  }

};

const jwtSecret = require('../config').jwtSecret;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const FailHandler = require('../middlewares/handlers/FailHandler');
const ErrorHandler = require('../middlewares/handlers/ErrorHandler');

module.exports = {
  /**
* A function to validate body
*
* @param {Object} credentials - credentails
* @returns {Object} Return Object
*/
  validate: async function (credentails) {
    try {
      const empId = credentails.userId;
      const password = credentails.password;
      if (!empId || !password) {
        throw new FailHandler(400, 'Please enter all fields', 'Please enter all fields');
      }
    } catch (err) {
      throw new FailHandler(400, err.message, err.details);
    };
  },

  /**
   * A function to get year by today's date
   *
   * @returns {String} Returns date
  */
  getYear: function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    return yyyy;
  },
  /**
   * A function to get month by today's date
   *
   * @returns {String} Returns date
  */
  getMonth: function () {
    const today = new Date();
    const mm = today.getMonth() + 1; // January is 0!
    return mm;
  },
  /**
   * A function to get day by today's date
   *
   * @returns {String} Returns date
  */
  getDay: function () {
    const today = new Date();
    const dd = today.getDate();
    return dd;
  },
  /**
* A function to hash the password
*
* @param {String} password - password to work on
* @returns {Object} Return Object
*/
  hash: async function (password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw new FailHandler(200, err.message, err.details);
    };
  },
  /**
* A function to check the password
*
* @param {String} password - password to work on
* @returns {Object} Return Object
*/
  checkPassword: async function (password, user) {
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new FailHandler(200, 'Invalid credentials', 'password is incorrect');
      }
    } catch (err) {
      throw new FailHandler(200, err.message, err.details);
    };
  },
  /**
* A function to get JWT
*
* @param {Object} user - user
* @returns {Object} Return Object
*/
  getJWT: async function (user) {
    try {
      const token = jsonwebtoken.sign({ id: user._id }, jwtSecret);
      const object = {
        empId: user.emp_id,
        role: user.role,
        token: token
      };
      return object;
    } catch (err) {
      throw new FailHandler(200, err.message, err.details);
    };
  },
  /**
 * A function to convert a string into number
 *
 * @param {String} string - string
 * @returns {Number} Return result
 *
*/
  convertToNumber: async function (string) {
    try {
      const result = parseInt(string);
      return result;
    } catch (error) {
      throw new ErrorHandler(500, 'Internal Server Error');
    }
  },
  /**
 * A function to convert array of objects containing ids to just array
 *
 * @param {Array} array - array
 * @returns {Array} Return result
 *
*/
  convert: async function (array) {
    try {
      const result = [];
      for (let index = 0; index < array.length; index++) {
        const id = array[index].id;
        result.push(id);
      }
      return result;
    } catch (error) {
      throw new ErrorHandler(500, 'Internal Server Error');
    }
  },

  /**
 * A function to get today's date
 *
 * @returns {String} Return date
 *
*/
  getDate: function () {
    const dateObject = new Date();
    const dd = String(dateObject.getDate()).padStart(2, '0');
    const mm = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dateObject.getFullYear();
    const today = dd + '-' + mm + '-' + yyyy;
    return today;
  },
  /**
 * A function to get total price for an item
 *
 * @param {Array} array - array to work on
 * @returns {Array} Return result
 *
*/
  getTotalforItem: function (array, qty) {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const up = parseInt(element.Price);
      const parsedQty = parseInt(qty);
      const total = parsedQty * up;
      result.push({
        item: element.Name,
        qty: parsedQty,
        up: up,
        total: total,
        unit: element.Unit
      });
    }
    return result;
  },
  /**
 * A function to reverse date (yyyy/mm/dd) to (dd-mm-yyyy)
 *
 * @param {String} str - date string
 * @returns {String} Return result
 *
*/
  reverseDate: function (str) {
    return str.split('-').reverse().join('-');
  },
  /**
 * A function to get total of all items and calculate discount
 *
 * @param {Array} array - array
 * @param {Number} discount - discount
 * @returns {Number} Return result
 *
*/
  getTotal: function (array, discount) {
    let result = 0;
    let calculation = 0;
    let final = 0;
    let temp = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      temp = element.total;
      if (array.length === 1) {
        result = temp;
      } else {
        result = result + temp;
      }
    }
    calculation = (result) * (discount / 100);
    final = result - calculation;
    return final;
  },
  /**
 * A function to concat customer's data
 *
 * @param {Object} customer - data of customer
 * @returns {String} Return result
 *
*/
  concatData: function (customer) {
    const address = this.replaceNwithBr(customer.Address);
    const result = customer.Name + '<br />' + address + '<br/>' + customer.ContactNo;
    return result;
  }

};

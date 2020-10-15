const FailHandler = require('../middlewares/handlers/FailHandler');
const ErrorHandler = require('../middlewares/handlers/ErrorHandler');
const User = require('../models/user');

module.exports = {

  /**
 * A function to add a new user
 *
 * @param {String} userID - user ID
 * @param {String} hash - hashed password
*/
  addUser: async function (userID, role, hash) {
    try {
      const newUser = new User({
        user_id: userID,
        password: hash,
        role
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new ErrorHandler(500, 'Internal Server Error');
    }
  },
  /**
 * A function to check a user existence for registration
 *
 * @param {String} userId -  ID
 * @returns {Object} Return result
*/
  checkUser: async function (userId) {
    const query = await User.findOne({ user_id: userId },
      function (err, result) {
        if (err) throw new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean();
    if (query !== null) {
      throw new FailHandler(
        200,
        'The user already exists.',
        `The user with this id: ${userId} already exists.`
      );
    }
    return query;
  },
  /**
 * A function to check a user existence for login
 *
 * @param {String} userId - user ID
 * @returns {Object} Return result
*/
  checkUserLogin: async function (userId) {
    const query = await User.findOne({ user_id: userId },
      function (err, result) {
        if (err) throw new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean();
    if (query === null) {
      throw new FailHandler(
        200,
        'The user does not exists.',
      `The user with this id: ${userId} does not exists.`
      );
    }
    return query;
  },
  /**
 * A function to check a user role
 *
 * @param {String} id - mongodb objectid
 * @returns {Object} Return result
*/
  checkUserRole: async function (id) {
    const query = await User.findOne({ _id: id }, { password: 0 },
      function (err, result) {
        if (err) throw new ErrorHandler(500, 'Internal Server Error');
        return result;
      }).lean();
    if (query === null) {
      throw new FailHandler(
        200,
        'The user does not exists.',
    `The user with this id: ${id} does not exists.`
      );
    }
    return query;
  }
};

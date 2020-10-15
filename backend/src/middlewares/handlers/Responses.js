const responses = {
//   required_key: {
//     code: 400,
//     message: 'REQUIRED_KEY',
//     description: 'Api key is required. Please provide a valid api key along with request.'
//   },
  internal_error: {
    code: 500,
    message: 'INTERNAL_ERROR',
    description: 'Something went wrong on server. Please contact server admin.'
  },
  required_auth: {
    code: 400,
    message: 'REQUIRED_AUTH_TOKEN',
    description: 'Auth Token is required. Please provide a valid auth token along with request.'
  },
  invalid_auth: {
    code: 401,
    message: 'INVALID_AUTH',
    description: 'Valid auth token is required. Please provide a valid auth token along with request.'
  },
  invalid_permission: {
    code: 401,
    message: 'INVALID_PERMISSION',
    description: 'Permission denied. Current user does not has required permissions for this resource.'
  },
  invalid_access: {
    code: 401,
    message: 'INVALID_ACCESS',
    description: 'Access denied. Current user does not has access for this resource.'
  },
  no_product: {
    code: 404,
    message: 'NO_PRODUCT_AVAILABLE',
    description: "Product is not available on assembly schedule by today's date"
  }
};

// errors.invalid_key = new ApiError(401, 'INVALID_KEY', 'Valid api key is required. Please provide a valid api key along with request.');
// errors.invalid_input = new ApiError(400, 'INVALID_INPUT', 'The request input is not as expected by API. Please provide valid input.');
// errors.input_too_large = new ApiError(400, 'INPUT_TOO_LARGE', 'The request input size is larger than allowed.');
// errors.invalid_input_format = new ApiError(400, 'INVALID_INPUT_FORMAT', 'The request input format is not allowed.');
// errors.invalid_operation = new ApiError(403, 'INVALID_OPERATION', 'Requested operation is not allowed due to applied rules. Please refer to error details.');
// errors.not_found = new ApiError(404, 'NOT_FOUND', 'The resource referenced by request does not exists.');
// errors.not_registeration = new ApiError(404, 'NOT_REGISTERATION', 'User not registered with this email/mobile.');
// // --------------- SOME OTHERS LOGIC ERRORS -------------------/
// errors.invalid_key = new ApiError(403, 'INVALID_VERFICATION_KEY', 'Key is expired or does not exists.Please provide a valid vaerfication key');
// errors.could_not_get_access_token = new ApiError(403, 'INVALID_OPERATION', 'Error in getting access token from auth0');
// errors.bad_request = new ApiError(403, 'INVALID_OPERATION', 'Bad Request');

module.exports = responses;

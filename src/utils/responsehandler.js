'use strict';

/**
 * Description: Returns an API as handled error response
 * @param req: Object, request object
 * @param res: Object, response object
 * @param message: String, error message
 * @param statusCode: Number, HTTP status code
 * @access public instance method
 * @return API Response Object
 */
function errorResponse(req, res, message, statusCode = 200) {
	let response = {
		isError: true,
		data: {
			'message': message
		}
	};
	return res.status(statusCode).json(response);
}

/**
 * Description: Returns an API as handled error response
 * @param req: Object, request object
 * @param res: Object, response object
 * @param data: Object, API data
 * @param statusCode: Number, HTTP status code
 * @access public instance method
 * @return Response Object
 */
function successResponse(req, res, data, statusCode = 200) {
	let response = {
		isError: false,
		data: data
	};
	return res.status(statusCode).json(response);
}

module.exports = {
	errorResponse: errorResponse,
	successResponse: successResponse
};

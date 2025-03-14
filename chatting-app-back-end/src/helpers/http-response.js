const ERROR = require("../config/error.config");

const successResponse = ({ res, data = undefined, message, token = undefined }) => {
    res.status(200).json({
        status: 200, message, data, token,
    })
}

const errorResponse = (res, err = null) => {
    let error;
    if (!err)
        error = ERROR["INTERNAL_SERVER_ERROR"]
    
    error = ERROR[err?.message] || ERROR["INTERNAL_SERVER_ERROR"];

    if (!error) ERROR["INTERNAL_SERVER_ERROR"]

    res.status(error.HTTP_CODE).json({
        status: error.HTTP_CODE || 500,
        message: error.DEFAULT_MESSAGE
    });

}

module.exports = {
    successResponse, errorResponse
}
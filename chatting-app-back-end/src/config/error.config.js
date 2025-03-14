const ERROR = {
    INTERNAL_SERVER_ERROR: {
        HTTP_CODE: 500,
        DEFAULT_MESSAGE: "Internal server error"
    },
    AUTH_NOT_FOUND: {
        HTTP_CODE: 401,
        DEFAULT_MESSAGE: "authorization token not found."
    },
    GROUP_EXIST: {
        HTTP_CODE: 401,
        DEFAULT_MESSAGE: "Group already exists"
    },
    
}

module.exports = ERROR
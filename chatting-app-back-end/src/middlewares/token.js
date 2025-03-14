const dotenv = require('dotenv')
const jwt = require("jsonwebtoken");
const { errorResponse } = require('../helpers/http-response');

dotenv.config();

const createToken = (userData) => {

    const token = jwt.sign(userData, process.env.SECRET_KEY)

    return token;
}

const verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw new Error("AUTH_NOT_FOUND");

        const token = req.headers.authorization.split("Bearer ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedData) => {
            if (err) {
                return res.status(403).json({ status: 403, message: "Invalid Token" });
            }
            else {
                req.user = decodedData;
                next();
            }
        });

    } catch (err) {
        if (err.name === "JsonWebTokenError")
            return res.status(401).json({ status: 401, message: err.message });

        if (err.name === "TokenExpiredError")
            return res.status(401).json({ status: 401, message: err.message });

        errorResponse(res, err);
    }
}

module.exports = {
    createToken, verifyToken
}
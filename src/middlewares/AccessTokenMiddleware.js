const jwt = require("jsonwebtoken");
const { CustomError } = require("./Errormiddleware");
require("dotenv").config();

const authentication = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if(accessToken) {
        await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY, (err) => {
            if(err) {
                return next(new CustomError("Unauthorized access", 403));
            }
            next()
        })
    }
    else {
        return next(new CustomError("AccessToken doesn't exsits", 401));
    }
}

module.exports = authentication;
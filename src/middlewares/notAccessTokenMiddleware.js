const jwt = require("jsonwebtoken");
const { CustomError } = require("./Errormiddleware");
require("dotenv").config();

const authentication = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if(accessToken) {
        await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
            if(!user || err) {
                return next()
            }
            return next(new CustomError("Access Token already exsits", 400))
        })
    }
    else {
        return next()
    }
}

module.exports = authentication;
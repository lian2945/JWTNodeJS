const { CustomError } = require("../middlewares/Errormiddleware.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const TokenData = (accessToken) => {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
    return decoded.id;
}

module.exports = TokenData;
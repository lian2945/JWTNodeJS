const { CustomError } = require("../middlewares/Errormiddleware.js");
const JWTContact = require("../models/JWTSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function LogoutService(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        await JWTContact.updateOne({ id: decoded.id }, { $set: { refreshtoken: "", expiresAt: "" } });
    }
    catch(error) {
        throw error;
    } 
}

module.exports = LogoutService;
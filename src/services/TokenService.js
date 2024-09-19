const { CustomError } = require("../middlewares/Errormiddleware.js");
const JWTContact = require("../models/JWTSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyRefreshToken = async (refreshToken) => {
    try {

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        const jwtInfo = await JWTContact.findOne({id: decoded.id});

        if(!jwtInfo || jwtInfo.refreshtoken !== refreshToken) {
            throw new CustomError("Invalid refresh token", 401);
        }

        if(jwtInfo.expiresAt < Date.now()) {
            throw new CustomError("Refresh token expired", 401);
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: '15m' }
        );

        const newRefreshToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: '7d' }
        )

        const newRefreshTokenTime = 7 * 24 * 60 * 60 * 1000;
        const ExpiresAt = Date.now() + newRefreshTokenTime;

        await JWTContact.updateOne({ id: decoded.id }, { $set: { refreshtoken: newRefreshToken, expiresAt: ExpiresAt } }, { upsert: true });

        return { newAccessToken, newRefreshToken, newRefreshTokenTime };
    }
    catch(erorr) {
        throw error;
    }
}

module.exports = VerifyRefreshToken;
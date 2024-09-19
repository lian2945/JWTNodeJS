const TokenReissue = require("../services/TokenService.js");
const { CustomError } = require("../middlewares/Errormiddleware.js");

// GET Method
const accessToken = async(req, res, next) => {
    const { refreshToken } = req.cookies;
    if(!refreshToken) {
        return next(new CustomError("Refresh Token doesn't exist", 401));
    }
    try {
        const { newAccessToken, newRefreshToken, newRefreshTokenTime } = await TokenReissue(refreshToken);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: newRefreshTokenTime
        });
        return res.status(200).end(newAccessToken);
    }
    catch(error) {
        return next(error);
    }
}

module.exports = accessToken;
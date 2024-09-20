const LogoutService = require("../services/LogoutService.js");
const { CustomError } = require("../middlewares/Errormiddleware.js");

// Delete Method
const Logout = async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if(!refreshToken) {
        return next(new CustomError("Refresh Token doesn't exsits", 400));
    }
    try {
        await LogoutService(refreshToken);
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        res.status(200).send("Successfully Logout");
    }
    catch(error) {
        return next(error);
    }
}

module.exports = Logout;
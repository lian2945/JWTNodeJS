const { LoginService } = require("../services/LoginService.js");
const { CustomError } = require("../middlewares/Errormiddleware.js");

// POST Method
const Login = async(req, res, next) => {
    const { id, password } = req.body;
    if( !id || !password || id.length >= 20 || password.length >= 20 ) {
        return next(new CustomError("ID 혹은 비밀번호가 유효하지 않습니다.", 400));
    }
    try {
        const { accessToken, refreshToken, refreshTokenTime } = await LoginService(id, password);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: refreshTokenTime
        });
        return res.status(200).json({ accessToken });
    }
    catch(error) {
        return next(error);
    }
}

module.exports = Login;
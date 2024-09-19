const { registerService } = require("../services/SignupService.js");
const { CustomError } = require("../middlewares/Errormiddleware.js");

// POST Method
const register = async (req, res, next) => {
    const { id, password } = req.body;
    if( !id || !password || id.length >= 20 || password.length >= 20 ) {
        return next(new CustomError("ID 혹은 비밀번호가 유효하지 않습니다.", 400));
    }
    try {
        await registerService(id, password);
        return res.status(201).send("Successfully registered");
    }
    catch(error) {
        return next(error);
    }
}

module.exports = register;
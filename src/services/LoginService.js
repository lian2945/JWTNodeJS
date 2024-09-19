const { CustomError } = require("../middlewares/Errormiddleware.js");
const userContact = require("../models/UserSchema.js");
const JWTContact = require("../models/JWTSchema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const generateTokens = (id) => {
    const accessToken = jwt.sign(
        { id: id },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { id: id },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
}

async function LoginService(id, password) {
    try {
        const verifyUser = await userContact.findOne({id: id});
        if(!verifyUser) {
            throw new CustomError("아이디가 존재하지 않습니다.", 400);
        }

        const verifyUserPassword = await bcrypt.compare(password, verifyUser.password);
        if(!verifyUserPassword) {
            throw new CustomError("비밀번호가 일치하지 않습니다.", 400);
        }
        
        const { accessToken, refreshToken } = generateTokens(id);
        const refreshTokenTime = 7 * 24 * 60 * 60 * 1000;

        const ExpiresAt = new Date(Date.now() + refreshTokenTime);

        await JWTContact.updateOne({ id: id }, { $set: { refreshtoken: refreshToken, expiresAt: ExpiresAt } }, { upsert: true });

        return { accessToken, refreshToken, refreshTokenTime };
    }
    catch(error) {
        throw error;
    }
}

module.exports = { LoginService };
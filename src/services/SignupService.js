const { CustomError } = require("../middlewares/Errormiddleware.js");
const userContact = require("../models/UserSchema.js");
const bcrypt = require("bcryptjs");

async function registerService(id, password) {
    try {
        const verifyUserID = await userContact.findOne({id: id});
        if(verifyUserID) {
            throw new CustomError("해당 ID가 이미 존재합니다", 400);
        } 
        const hashedPassword = await bcrypt.hash(password, 10); // 2^10번 수학적 연산으로 암호화
        await userContact.create({
            id: id, password: hashedPassword
        }); // id랑 암호화된 password를 userContact DB에 만들고 그 결과값을 result에 저장한다.
    }
    catch(error) {
        throw error;
    }
}

module.exports = { registerService };
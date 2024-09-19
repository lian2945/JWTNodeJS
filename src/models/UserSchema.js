const mongo = require("mongoose");

const UserSchema = new mongo.Schema({
    id: {
        type: String,
        required: [true, `Nickname doesn't exit`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `Refresh token doesn't exit`]
    }
})

const UserDatabase = mongo.model("UserModel", UserSchema);

module.exports = UserDatabase;
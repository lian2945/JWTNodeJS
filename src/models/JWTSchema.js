const mongo = require("mongoose");

const JWTSchema = new mongo.Schema({
    id: {
        type: String,
        required: [true, `Nickname doesn't exit`],
        unique: true
    },
    refreshtoken: {
        type: String,
        required: [true, `Refresh token doesn't exit`]
    },
    expiresAt: {
        type: Date,
        required: [true, `ExpiresAt doesn't exit`]
    }
})

const JWTDatabase = mongo.model("JWTModel", JWTSchema);

module.exports = JWTDatabase;
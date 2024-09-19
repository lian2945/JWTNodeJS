const mongo = require("mongoose");
const { CustomError } = require("../middlewares/Errormiddleware.js");
require("dotenv").config();

//JWTDB Connecting Init
const DBConnect = async() => {
    try {
        await mongo.connect(process.env.MONGODB_KEY); // DB Connect
        console.log(`Mongo Database Connected`);
    }
    catch(error) {
        throw new CustomError("Database Connecting Error", 500);
        process.exit(1);
    }
}

module.exports = DBConnect;
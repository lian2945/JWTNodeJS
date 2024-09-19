const express = require("express");
const router = express.Router();
const register = require("../controllers/SignupController.js");

router
    .route("/")
    // POST Method
    .post(register)

module.exports = router;
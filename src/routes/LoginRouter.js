const express = require("express");
const router = express.Router();
const Login = require("../controllers/LoginController.js");

router
    .route("/")
    // POST Method
    .post(Login)

module.exports = router;
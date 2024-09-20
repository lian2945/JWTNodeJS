const express = require("express");
const router = express.Router();
const Logout = require("../controllers/LogoutController.js");

router
    .route("/")
    .delete(Logout)

module.exports = router;
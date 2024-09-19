const express = require("express");
const router = express.Router();
const accessToken = require("../controllers/TokenController.js");

router
    .route("/")
    .get(accessToken)

module.exports = router;
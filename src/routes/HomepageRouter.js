const express = require("express");
const router = express.Router();
const UserInfo = require("../controllers/HomepageController.js");

router
    .route("/")
    .get(UserInfo)

module.exports = router;
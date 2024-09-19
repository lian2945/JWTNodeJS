const HomepageService = require("../services/HomepageService.js");

const Homepage = async(req, res, next) => {
    try {
        const accessToken = req.headers['authorization'].split(' ')[1]
        const userID = await HomepageService(accessToken);
        return res.status(200).json(userID);
    }
    catch(error) {
        return next(error);
    }
}

module.exports = Homepage;
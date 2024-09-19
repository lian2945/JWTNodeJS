const express = require("express");
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const MongoDBConnection = require("./src/configs/DBConfig.js");
const { CustomError, ErrorHandler } = require("./src/middlewares/Errormiddleware.js");
const AccessTokenMiddleware = require("./src/middlewares/AccessTokenMiddleware.js");
const NotAccessTokenMiddleware = require("./src/middlewares/notAccessTokenMiddleware.js");

MongoDBConnection();

app.use(express.json());
app.use(cookieParser());
app.use("/token", NotAccessTokenMiddleware, require("./src/routes/TokenRouter.js"));
app.use("/login", NotAccessTokenMiddleware, require("./src/routes/LoginRouter.js"));
app.use("/signup", NotAccessTokenMiddleware, require("./src/routes/SignupRouter.js"));
app.use("/home", AccessTokenMiddleware, require("./src/routes/HomepageRouter.js"));
app.use((req, res, next) => {
    next(new CustomError("Not found", 404));
})
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Server is opened on ${port}`)
});
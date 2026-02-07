const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config/jwt.config");

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth){
        const err = new Error("Token missing");
        err.statusCode = 401;
        return next(err);
    }

    try{
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, accessTokenSecret);
        req.user = decoded;
        next();
    } catch {
        const err = new Error("Invalid token");
        err.statusCode = 403;
        next(err);
    }
};

module.exports = {
    authenticate
};
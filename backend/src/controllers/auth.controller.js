const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const { generateId } = require("../utils/id.util");

const login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if(username !== "demo" || password !== "password"){
            const err = new Error("Invalid credentials");
            err.statuCode = 401;
            throw err;
        }

        const userId = generateId();

        const accessToken = jwt.sign(
            { userId, username },
            jwtConfig.accessTokenSecret,
            { expiresIn: jwtConfig.accessTokenExpiry }
        );

        const refreshToken = jwt.sign(
            {userId},
            jwtConfig.refreshTokenSecret,
            { expiresIn: jwtConfig.refreshTokenExpiry }
        );

        res.json({
            error: false,
            message: "Login Successful",
            data: { accessToken, refreshToken }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
};
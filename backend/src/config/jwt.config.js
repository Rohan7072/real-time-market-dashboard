const { jwtSecret, jwtRefreshSecret } = require("./env.config");

module.exports = {
    accessTokenSecret: jwtSecret,
    refreshTokenSecret: jwtRefreshSecret,
    accessTokenExpiry: "15h",
    refreshTokenExpiry: "7d"
};


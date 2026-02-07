require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8082,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET
};

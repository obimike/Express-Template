const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: config.ACCESS_TOKEN_LIFE,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_TOKEN, {
    expiresIn: config.REFRESH_TOKEN_LIFE,
  });
};

const verifyToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return "Access token expired"; // Handle expired access token (e.g., refresh)
    } else {
      return "Invalid access token";
    }
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };

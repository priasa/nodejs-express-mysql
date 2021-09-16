const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refresh_token.model");

const dotenv = require("dotenv");
dotenv.config();

function generateAccessToken(email) {
  return new Promise((resolve, reject) => {
    return resolve(jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
      }));
  })
}

function generateRefreshToken(email) {
  return new Promise((resolve, reject) => {
    RefreshToken.create(email, (err, data) => {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data.token);
        }
      });
  })
}

const loginService = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken
};

module.exports = loginService;

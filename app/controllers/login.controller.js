const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const loginService = require("../services/login.service");
const userService = require("../services/user.service");
const refreshTokenService = require("../services/refresh_token.service");

doLogin = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    var user = await userService.findUserByEmail(req.body.email);
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      var token = await loginService.generateAccessToken(req.body.email);
      var refreshToken = await loginService.generateRefreshToken(
        req.body.email
      );
      return res.status(200).send({
        accessToken: token,
        refreshToken: refreshToken,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while login process.",
    });
  }
};

doRefreshToken = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try {
    var currentRefreshToken = await refreshTokenService.findByToken(
      req.body.token
    );
    if (!currentRefreshToken) {
      return res.status(403).send({ message: "Refresh Token not found" });
    }

    var currUnixTimestamp = parseInt((new Date().getTime() / 1000).toFixed(0));
    if (currentRefreshToken.expired_at <= currUnixTimestamp) {
      return res.status(403).send({ message: "Refresh Token was expired" });
    }

    var token = await loginService.generateAccessToken(currentRefreshToken.email);
    return res.status(200).send({
      accessToken: token,
      refreshToken: currentRefreshToken.token,
    });
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while processing refresh token.",
    });
  }
};

const loginController = {
  doLogin: doLogin,
  doRefreshToken: doRefreshToken,
};

module.exports = loginController;

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const loginService = require("../services/login.services");

exports.doLogin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save User in the database
  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    }
    console.log(data);
    if (data) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      var token = loginService.generateAccessToken(req.body.email);
      console.log(token);
      return res.status(200).send({
        accessToken: token,
      });
    }
  });
};

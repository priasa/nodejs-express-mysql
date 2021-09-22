const User = require("../models/user.model");
const userService = require("../services/user.service")
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

doCreateUser = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    id: uuid.v4()
  });

  try {
    var newUser = await userService.createUser(user);
    console.log("created user: ", { id: res.insertId, ...newUser });
    res.status(201).send({message : 'Username '.concat(user.email, ' has been created' )});
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Customer.",
    });
  }
}

const userController = {
  doCreateUser: doCreateUser
}

module.exports = userController
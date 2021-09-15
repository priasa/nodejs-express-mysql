const User = require("../models/user.model");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
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

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.status(201).send({message : 'Username '.concat(user.email, ' has been created' )});
  });
};

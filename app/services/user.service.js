const User = require("../models/user.model");

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findByEmail(email, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function createUser(newUser) {
  return new Promise((resolve, reject) => {
    User.create(newUser, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  }); 
}

const userService = {
  findUserByEmail: findUserByEmail,
  createUser: createUser
};

module.exports = userService;

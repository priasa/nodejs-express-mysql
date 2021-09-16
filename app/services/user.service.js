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

const userService = {
  findUserByEmail: findUserByEmail,
};

module.exports = userService;

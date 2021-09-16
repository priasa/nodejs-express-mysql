const RefreshToken = require("../models/refresh_token.model");

function findByToken(token) {
  return new Promise((resolve, reject) => {
    RefreshToken.findByToken(token, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

const refreshTokenService = {
    findByToken: findByToken,
};

module.exports = refreshTokenService;

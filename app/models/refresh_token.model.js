const sql = require("./db.js");
const { v4: uuidv4 } = require("uuid");

const RefreshToken = function (refreshToken) {
  this.email = refreshToken.email;
  this.expired_at = refreshToken.expiredAt;
  this.token = refreshToken.token;
};

RefreshToken.create = (email, result) => {
  let date = new Date();
  date.setSeconds(date.getSeconds() + 86400);
  expiredAt = parseInt((date.getTime()/1000).toFixed(0))

  const newRefreshToken = {
    email: email,
    token: uuidv4(),
    expired_at: expiredAt,
  };

  sql.query("INSERT INTO refresh_token SET ?", newRefreshToken, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created refresh token: ", { token: res.insertId, ...newRefreshToken });
    result(null, { token: res.insertId, ...newRefreshToken });
  });
};

RefreshToken.findByToken = (token, result) => {
    sql.query(`SELECT * FROM refresh_token WHERE token = '${token}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found token: ", res[0]);
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
      });
} 

module.exports = RefreshToken;

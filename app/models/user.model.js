const sql = require("./db.js");

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.id = user.id;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO trx_users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM trx_users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;

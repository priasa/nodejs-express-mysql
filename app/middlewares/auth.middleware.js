const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { TokenExpiredError } = jwt;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
        return catchError(err, res)
    }
    req.email = jwt.decode.email;
    next();
  });
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired." });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};

const auth = {
  verifyToken: verifyToken,
};

module.exports = auth;

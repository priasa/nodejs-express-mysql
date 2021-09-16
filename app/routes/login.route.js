const loginController = require("../controllers/login.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Customer
  app.post("/login", loginController.doLogin);
  app.post("/refreshToken", loginController.doRefreshToken);
};

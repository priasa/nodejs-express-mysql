module.exports = app => {
    const login = require("../controllers/login.controller");
    // Create a new Customer
    app.post("/login", login.doLogin);
};
    
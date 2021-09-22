const auth = require("../middlewares/auth.middleware");
const customers = require("../controllers/customer.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Customer
  app.post("/customers", [auth.verifyToken], customers.doCreate);
  // Retrieve all Customers
  app.get("/customers", [auth.verifyToken], customers.doFindAll);
  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", [auth.verifyToken], customers.doFindOne);
  // Update a Customer with customerId
  app.put("/customers/:customerId", [auth.verifyToken], customers.doUpdate);
  // Delete a Customer with customerId
  app.delete("/customers/:customerId", [auth.verifyToken], customers.doDelete);
  // Create a new Customer
  app.delete("/customers", [auth.verifyToken], customers.doDeleteAll);
};

const auth = require('../middlewares/auth.middleware')
const customers = require("../controllers/customer.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();

    });

    // Create a new Customer
    app.post("/customers", customers.create);
    // Retrieve all Customers
    app.get("/customers", [auth.verifyToken], customers.findAll);
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", customers.findOne);
    // Update a Customer with customerId
    app.put("/customers/:customerId", customers.update);
    // Delete a Customer with customerId
    app.delete("/customers/:customerId", customers.delete);
    // Create a new Customer
    app.delete("/customers", customers.deleteAll);
};
    
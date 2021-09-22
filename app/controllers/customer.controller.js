const customerService = require("../services/customer.service");
const uuid = require("uuid");

// Create and Save a new Customer
doCreate = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
    id: uuid.v4(),
  });

  try {
    var newCustomer = await customerService.create(customer);
    if (newCustomer) {
      res.status(201).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error creating Customer with email " + customer.email,
    });
  }
};

// Retrieve all Customers from the database.
doFindAll = async (req, res) => {
  try {
    var data = await customerService.getAll();
    if (data) {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Customers",
    });
  }
};

doFindOne = async (req, res) => {
  try {
    var data = await customerService.findById(req.params.customerId);
    if (data) {
      res.status(200).send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`,
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Customer with id " + req.params.customerId,
      });
    }
  }
};

doUpdate = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  try {
    var data = await customerService.updateById(
      req.params.customerId,
      new Customer(req.body)
    );
    if (data) {
      res.status(200).send(data);
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`,
      });
    } else {
      res.status(500).send({
        message: "Error updating Customer with id " + req.params.customerId,
      });
    }
  }
};

doDelete = async (req, res) => {
  try {
    var data = await customerService.removeById(req.params.customerId);
    if (data) {
      res.status(200).send({ message: `Customer was deleted successfully!` });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`,
      });
    } else {
      res.status(500).send({
        message: "Error deleting Customer with id " + req.params.customerId,
      });
    }
  }
};

doDeleteAll = async (req, res) => {
  try {
    var data = customerService.removeAll();
    if (data) {
      res
        .status(200)
        .send({ message: `All Customers were deleted successfully!` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all customers.",
    });
  }
};

const customerController = {
  doCreate: doCreate,
  doFindAll: doFindAll,
  doDelete: doDelete,
  doDeleteAll: doDeleteAll,
  doUpdate: doUpdate,
  doFindOne: doFindOne,
};

module.exports = customerController;

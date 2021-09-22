const Customer = require("../models/customer.model");

function create(newCustomer) {
  return new Promise((resolve, reject) => {
    Customer.create(newCustomer, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function findById(customerId) {
  return new Promise((resolve, reject) => {
    Customer.findById(customerId, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    Customer.getAll((err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function updateById(id, customer) {
  return new Promise((resolve, reject) => {
    Customer.updateById(id, customer, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function removeById(id) {
  return new Promise((resolve, reject) => {
    Customer.remove(id, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

function removeAll() {
  return new Promise((resolve, reject) => {
    Customer.removeAll((err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}

const customerService = {
  create: create,
  findById: findById,
  getAll: getAll,
  updateById: updateById,
  removeById: removeById,
  removeAll: removeAll
};

module.exports = customerService;

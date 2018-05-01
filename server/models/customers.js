const mongoose = require("mongoose");

// customer Schema
const customers = mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  contactFirstName: {
    type: String,
    required: true
  },
  contactLastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  salesRepEmployeeNumber: {
    type: String,
    required: true
  },
  creditLimit: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("customers", customers);

const mongoose = require("mongoose");
var customers = require("../models/customers");
var ObjectId = require("mongoose").Types.ObjectId;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function updateCustomer(req, responce) {
  var customerNewData = {
    customerName: decodeURIComponent(req.body.customerName),
    contactFirstName: decodeURIComponent(req.body.contactFirstName),
    contactLastName: decodeURIComponent(req.body.contactLastName),
    phone: decodeURIComponent(req.body.phoneNumber),
    addressLine1: decodeURIComponent(req.body.addressLine1),
    addressLine2: decodeURIComponent(req.body.addressLine2),
    city: decodeURIComponent(req.body.city),
    state: decodeURIComponent(req.body.state),
    postalCode: decodeURIComponent(req.body.postalCode),
    country: decodeURIComponent(req.body.country),
    salesRepEmployeeNumber: decodeURIComponent(req.body.salesRepEmployeeNumber),
    creditLimit: decodeURIComponent(req.body.creditLimit)
  }
  customers.update({ _id: ObjectId(req.body.id) }, customerNewData, function(
    err,
    customers
  ) {
    if (err) {
      responce(err);
    } else {
      var resp = { responce: "success" };

      responce(resp);
    }
  });
}
module.exports.getAllCustomers = (req, res) => {
  customers.find({}, { customerName: "" }, function(err, customers) {
    if (err) {
      res.status(500).json(err);
    }

    res.json(customers);
  });
};

module.exports.customerWithId = (req, res) => {
  customers.find({ _id: ObjectId(req.query.id) }, function(err, customers) {
    if (err) {
      res.status(500).json(err);
    }

    res.json(customers);
  });
};

module.exports.postCustomer = (req, res) => {
  var cust = new customers({
    customerName: decodeURIComponent(req.body.customerName),
    contactFirstName: decodeURIComponent(req.body.contactFirstName),
    contactLastName: decodeURIComponent(req.body.contactLastName),
    phone: decodeURIComponent(req.body.phoneNumber),
    addressLine1: decodeURIComponent(req.body.addressLine1),
    addressLine2: decodeURIComponent(req.body.addressLine2),
    city: decodeURIComponent(req.body.city),
    state: decodeURIComponent(req.body.state),
    postalCode: decodeURIComponent(req.body.postalCode),
    country: decodeURIComponent(req.body.country),
    salesRepEmployeeNumber: decodeURIComponent(req.body.salesRepEmployeeNumber),
    creditLimit: decodeURIComponent(req.body.creditLimit)
  });
  cust.save(function(err, customers) {
    if (err) {
      res.status(500).json(err);
    }
    var response = { responce: "success" };
    res.json(response);
  });
};

module.exports.deleteCustomer = (req, res) => {
  customers.remove({ _id: ObjectId(req.query.id) }, function(err, customers) {
    if (err) {
      res.status(500).json(err);
      console.log(err);
    }
    var response = { responce: "success" };

    res.json(response);
  });
};

module.exports.updateCustomer = (req, res) => {
  customers.find({ _id: ObjectId(req.body.id) }, function(err, customers) {
    if (err) {
      res.status(500).json(err);
    }
    else
    {
    if(isEmpty(customers))
    {
        var responce = {"response":"not found"}
        res.json(responce);
    }
    else{
        updateCustomer(req, function(resp){
            res.json(resp);
        });
    }
}
    
    
  });
};

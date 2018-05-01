const express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var customerController = require("./server/controllers/customerController");
//var cors = require('cors');
//app.use(cors())

app.use(express.static("client"));
app.use(bodyParser.json());
// connect to mongoose
mongoose.connect("mongodb://localhost/app_data");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected!");
});

app.get("/customers", customerController.getAllCustomers);
app.get("/customerWithId", customerController.customerWithId);
app.post("/saveCustomer", customerController.postCustomer);
app.delete("/deleteCustomer", customerController.deleteCustomer);
app.put("/updateCustomerWithId", customerController.updateCustomer);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listening at http://%s:%s", host, port);
});

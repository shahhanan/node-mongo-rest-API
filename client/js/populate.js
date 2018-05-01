// show a particular customers details
function viewCustomerDetails(id) {
  var data = {
    method: "GET",
    url: "/customerWithId",
    divClass: "loading-bar",
    divID: "loading-spinnerr",
    appendto: "RDiv",
    payload: {
      id: id
    }
  };
  reqAjax(
    data,
    function(details) {
      document.getElementById("RDiv").innerHTML =
        "NAME : " +
        details[0].customerName +
        "<br>CONTACT LAST NAME : " +
        details[0].contactLastName +
        "<br>CONTACT FIRST NAME : " +
        details[0].contactFirstName +
        "<br>PHONE NUMBER : " +
        details[0].phone +
        "<br>ADDRESS LINE 1 : " +
        details[0].addressLine1 +
        "<br>ADDRESS LINE 2 : " +
        details[0].addressLine2 +
        "<br>CITY : " +
        details[0].city +
        "<br>STATE : " +
        details[0].state +
        "<br>POSTAL CODE : " +
        details[0].postalCode +
        "<br>COUNTRY : " +
        details[0].country +
        "<br>SALES REPRESENTATIVE NUMBER : " +
        details[0].salesRepEmployeeNumber +
        "<br>CREDIT LIMIT : " +
        details[0].creditLimit +
        "$<br>";
    },
    function(errdata) {
      alert(errdata);
    }
  );
}

// update a particular customers details
function updateCustomerDetails(id) {
  var data = id.split("/");
  var id = data[0];
  var name = data[1];
  document.getElementById("idcust").value = id;

  var updateButton = document.getElementById("submitbtn2");
  var submitButton = document.getElementById("submitbtn");
  updateButton.setAttribute("type", "text");
  submitButton.setAttribute("type", "hidden");

  // get data from db and insert details into form
  var data = {
    method: "GET",
    url: "/customerWithId",
    divClass: "loading-bar",
    divID: "loading-spinnerr",
    appendto: "RDiv",
    payload: {
      id: id
    }
  };
  reqAjax(
    data,
    function(details) {
      document.getElementById("cfname").value = details[0].contactFirstName;
      document.getElementById("clname").value = details[0].contactLastName;
      document.getElementById("name").value = details[0].customerName;
      document.getElementById("number").value = details[0].phone;
      document.getElementById("addressl1").value = details[0].addressLine1;
      document.getElementById("addressl2").value = details[0].addressLine2;
      document.getElementById("city").value = details[0].city;
      document.getElementById("state").value = details[0].state;
      document.getElementById("postalcode").value = details[0].postalCode;
      document.getElementById("country").value = details[0].country;
      document.getElementById("salesrepnumber").value =
        details[0].salesRepEmployeeNumber;
      document.getElementById("creditlimit").value = details[0].creditLimit;
    },
    function(errdata) {
      alert(errdata);
    }
  );

  //get the details of the user here and populate in the form and then on sumbit button update the details
}
function updateCustomer(form) {
  var jsonFormData = JSON.parse(serialize(form));
  var dataForPost = {
    method: "PUT",
    url: "/updateCustomerWithId",
    divClass: "loading-bar",
    divID: "loading-spinnerr",
    appendto: "formOne"
  };
  dataForPost.payload = jsonFormData;
  reqAjax(
    dataForPost,
    function(responceData) {
      document.getElementById('RDiv').innerHTML = '';
      alert('Details Updated Successufully');
      populateData();
    },
    function(errdata) {
      alert(errdata);
    }
  );
}

function deletecustomer(id) {
  var id = document.getElementById(id).value;
  var data = {
    method: "DELETE",
    url: "/deleteCustomer",
    divClass: "loading-bar",
    divID: "loading-spinnerr",
    appendto: "RDiv",
    payload: {
      id: id
    }
  };
  reqAjax(
    data,
    function(details) {
      $("#exampleModal").modal("hide");
      populateData();
    },
    function(errdata) {
      alert(errdata);
    }
  );
}
// delete a particular customers details
function deleteCustomerDetails(id) {
  var data = id.split("/");
  var name = "''" + data[1] + "''";
  document.getElementById("customeridhiddenbutton").value = data[0];
  document.getElementById("custName").innerHTML = name;
  $("#exampleModal").modal("show");
}
// serialize the form elements
function serialize(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  var i,
    j,
    q = [];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case "INPUT":
        switch (form.elements[i].type) {
          case "text":
          case "hidden":
          case "password":
          case "button":
          case "reset":
          case "submit":
            q.push(
              form.elements[i].name +
                "=" +
                encodeURIComponent(form.elements[i].value)
            );
            break;
          case "checkbox":
          case "radio":
            if (form.elements[i].checked) {
              q.push(
                form.elements[i].name +
                  "=" +
                  encodeURIComponent(form.elements[i].value)
              );
            }
            break;
          case "file":
            break;
        }
        break;
      case "TEXTAREA":
        q.push(
          form.elements[i].name +
            "=" +
            encodeURIComponent(form.elements[i].value)
        );
        break;
      case "SELECT":
        switch (form.elements[i].type) {
          case "select-one":
            q.push(
              form.elements[i].name +
                "=" +
                encodeURIComponent(form.elements[i].value)
            );
            break;
          case "select-multiple":
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(
                  form.elements[i].name +
                    "=" +
                    encodeURIComponent(form.elements[i].options[j].value)
                );
              }
            }
            break;
        }
        break;
      case "BUTTON":
        switch (form.elements[i].type) {
          case "reset":
          case "submit":
          case "button":
            q.push(
              form.elements[i].name +
                "=" +
                encodeURIComponent(form.elements[i].value)
            );
            break;
        }
        break;
    }
  }
  var arrayLength = q.length;
  var obj = {};
  for (var i = 0; i < arrayLength; i++) {
    var res = q[i].split("=");
    obj[res[0]] = res[1];
  }
  return JSON.stringify(obj);
}

function prepareDataToPost(form) {
  var jsonFormData = JSON.parse(serialize(form));
  delete jsonFormData.id;
  var dataForPost = {
    method: "POST",
    url: "/saveCustomer",
    divClass: "loading-bar",
    divID: "loading-spinnerr",
    appendto: "formOne"
  };
  dataForPost.payload = jsonFormData;
  reqAjax(
    dataForPost,
    function(responceData) {
      //    document.getElementsByTagName('body')[0].removeChild('maincontainer');
      populateData();
    },
    function(errdata) {
      alert(errdata);
    }
  );
}

function populateData() {
  var Div0 = document.createElement("div");
  Div0.id = "maincontainer";
  Div0.className = "container";
  document.getElementsByTagName("body")[0].appendChild(Div0);
  // creating json data for testing purpose
  var Data = {
    method: "GET",
    url: "/customers",
    divClass: "loading-bar",
    divID: "loading-spinner",
    appendto: "maincontainer"
  };

  reqAjax(
    Data,
    function(Data) {
      // create Left div indide maincontainer
      var leftDiv = document.createElement("div");
      leftDiv.id = "LDiv";
      leftDiv.className = "LeftDiv";
      document.getElementById("maincontainer").appendChild(leftDiv);

      // create Left div indide maincontainer
      var rightDiv = document.createElement("div");
      rightDiv.id = "RDiv";
      rightDiv.className = "RightDiv";
      document.getElementById("maincontainer").appendChild(rightDiv);

      var length = Data.length;
      for (var i = 0, td2 = "", td = "", divid = 1; i < length; i++) {
        var sendData = Data[i]._id + "/" + Data[i].customerName;
        td +=
          "<tr> <td>" +
          Data[i].customerName +
          ' &nbsp;&nbsp;</td> <td> <span tabindex="0" id="' +
          sendData +
          '" data-trigger="focus" class="btn btn-lg btn-danger popover-btn fa fa-cog myicons" role="button" data-toggle="popover">  </span> </td> </tr>';
      }
      var table = "";
      table = '<table class="table1">' + td + "</table>";
      document.getElementById("LDiv").innerHTML = table;
      // document.getElementById('LDiv').insertAdjacentHTML('afterbegin', table);
      enablePopovers();
    },
    function(errdata) {
      alert(errdata);
    }
  );
}

function getPopoverContent(element) {
  var data = this.id.split("/");
  return (
    "<span onclick=\"viewCustomerDetails('" +
    data[0] +
    '\')" class="fa fa-eye myicons"> &nbsp;&nbsp;&nbsp; </span><span onclick="updateCustomerDetails(\'' +
    this.id +
    '\')" class="fa fa-pencil-square-o myicons"> &nbsp;&nbsp;&nbsp; </span><span onclick="deleteCustomerDetails(\'' +
    this.id +
    '\')" class="fa fa-trash myicons"></span>'
  );
}
function enablePopovers() {
  var options = {
    placement: "right",
    html: true,
    content: this.getPopoverContent
  };
  $('[data-toggle="popover"]').popover(options);
}

window.onload = populateData;
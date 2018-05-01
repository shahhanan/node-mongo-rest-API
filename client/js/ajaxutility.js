var reqAjax = function(
  Data,
  onComplete,
  onError // function starts here
) {
  var responcemessage;
  var method = ["GET", "POST", "PUT", "DELETE"];

  if (method.indexOf(Data.method) > -1) {
    // data method check condition
    switch (Data.method) {
      case "GET":
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          // create spinner div
          var sloading = document.createElement("div");
          sloading.id = Data.divID;
          sloading.className = Data.divClass;
          document.getElementById(Data.appendto).appendChild(sloading);

          if (this.readyState == 1) {
            document.getElementById(sloading.id).style.display = "block";
          }
          if (this.readyState == 4) {
            document.getElementById(sloading.id).style.display = "none";
          }

          if (
            this.readyState == 4 &&
            (this.status >= 200 && this.status <= 399)
          ) {
            resp = this.responseText;
            var data = JSON.parse(resp);
            onComplete(data);
          }

          if (this.readyState == 4 && this.status >= 400) {
            resp = this.responseText;
            onError(resp);
          }
        };
        if (Data.payload) {
          var load = Data.payload;
          var qp = [];
          var str = "";
          for (var key in load) {
            qp.push(key + "=" + load[key]);
          }
          var str = qp.join("&");
          xmlhttp.open(Data.method, Data.url + "?" + str, true);
        } else {
          xmlhttp.open(Data.method, Data.url, true);
        }
        xmlhttp.send();
        break;

      case "POST":
        var sendInfo = JSON.stringify(Data.payload);
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          // create spinner div
          var sploading = document.createElement("div");
          sploading.id = Data.divID;
          sploading.className = Data.divClass;
          document.getElementById(Data.appendto).appendChild(sploading);

          if (this.readyState == 1) {
            document.getElementById(sploading.id).style.display = "block";
          }
          if (this.readyState == 4) {
            document.getElementById(sploading.id).style.display = "none";
          }

          if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText;
            //	var data = JSON.parse(resp);
            onComplete(resp);
          }

          if (this.readyState == 4 && this.status >= 400) {
            resp = this.responseText;
            onError(resp);
          }
        };
        xmlhttp.open(Data.method, Data.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(sendInfo);
        break;

      case "PUT":
        var sendInfo = JSON.stringify(Data.payload);
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          // create spinner div
          var sploading = document.createElement("div");
          sploading.id = Data.divID;
          sploading.className = Data.divClass;
          document.getElementById(Data.appendto).appendChild(sploading);

          if (this.readyState == 1) {
            document.getElementById(sploading.id).style.display = "block";
          }
          if (this.readyState == 4) {
            document.getElementById(sploading.id).style.display = "none";
          }

          if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText;
            //	var data = JSON.parse(resp);
            onComplete(resp);
          }

          if (this.readyState == 4 && this.status >= 400) {
            resp = this.responseText;
            onError(resp);
          }
        };
        xmlhttp.open(Data.method, Data.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(sendInfo);
        break;
      case "DELETE":
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          // create spinner div
          var sloading = document.createElement("div");
          sloading.id = Data.divID;
          sloading.className = Data.divClass;
          document.getElementById(Data.appendto).appendChild(sloading);

          if (this.readyState == 1) {
            document.getElementById(sloading.id).style.display = "block";
          }
          if (this.readyState == 4) {
            document.getElementById(sloading.id).style.display = "none";
          }

          if (
            this.readyState == 4 &&
            (this.status >= 200 && this.status <= 399)
          ) {
            resp = this.responseText;
            var data = JSON.parse(resp);
            onComplete(data);
          }

          if (this.readyState == 4 && this.status >= 400) {
            resp = this.responseText;
            onError(resp);
          }
        };
        if (Data.payload) {
          var load = Data.payload;
          var qp = [];
          var str = "";
          for (var key in load) {
            qp.push(key + "=" + load[key]);
          }
          var str = qp.join("&");
          xmlhttp.open(Data.method, Data.url + "?" + str, true);
        } else {
          xmlhttp.open(Data.method, Data.url, true);
        }
        xmlhttp.send();
        break;
    }
  } // data method check condition ends here // data method check condition else here
  else {
    responcemessage = "Please enter a valid method in the configuration";
    onError(responcemessage);
  }
};

var container = document.getElementById('container');
var getdogsbtn = document.getElementById('getdogs');
var i = 0;

/* Get all dogs */
function getdogs() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', '/getdog');
    ourRequest.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
        getdogs(data);
    }
    ourRequest.send();

    function getdogs(data) {
        var myHTMLString = '';
        for (i = 0; i < data.length; i++) {
            myHTMLString += "<p>" + "<strong>DogID:</strong> " + data[i].DogID + " <strong>DKKnr:</strong> " + data[i].DKKnr + " <strong>Name:</strong> " + data[i].Name + " <strong>Birthday:</strong> " + data[i].Birthday + " <strong>Sex:</strong> " + data[i].Sex + " <strong>HD Status:</strong> " + data[i].HD_status + " <strong>Patella:</strong> " + data[i].Patella + " <strong>Dad:</strong> " + data[i].FK_DogID_Dad + " <strong>Mom:</strong> " + data[i].FK_DogID_Mom + " <strong>OwnerID:</strong> " + data[i].FK_OwnerID + "</p>";
            container.innerHTML = myHTMLString;
        }
    }
}

/* Get dog by sex */
var sexcontainer = document.getElementById('sexcontainer');
function getmatings() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', '/getdog/' + document.getElementById("sex").value);
    ourRequest.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(sex);
        getmatings(data);
    }
    ourRequest.send();

    function getmatings(data) {
        var myHTMLString = '';
        for (i = 0; i < data.length; i++) {
            myHTMLString += "<p>" + "<strong>DogID:</strong> " + data[i].DogID + " <strong>DKKnr:</strong> " + data[i].DKKnr + " <strong>Name:</strong> " + data[i].Name + " <strong>Birthday:</strong> " + data[i].Birthday + " <strong>Sex:</strong> " + data[i].Sex + " <strong>HD Status:</strong> " + data[i].HD_status + " <strong>Patella:</strong> " + data[i].Patella + " <strong>Dad:</strong> " + data[i].FK_DogID_Dad + " <strong>Mom:</strong> " + data[i].FK_DogID_Mom + " <strong>OwnerID:</strong> " + data[i].FK_OwnerID + "</p>";
            sexcontainer.innerHTML = myHTMLString;
        }
    }
}

/* Get all mating request */
matingcontainer = document.getElementById('matingcontainer');
function getmating() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', '/getmating/' + document.getElementById("MatingID").value);
    ourRequest.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
        getdogs(data);
    }
    ourRequest.send();

    function getdogs(data) {
        var myHTMLString = '';
        for (i = 0; i < data.length; i++) {
            myHTMLString += "<p>" + "<strong>MatingID:</strong> " + data[i].MatingID + " <strong>Male dogID:</strong> " + data[i].FK_dogID_Male + " <strong>Female dogID:</strong> " + data[i].FK_dogID_Female + " <strong>Approved:</strong> " + data[i].Approved + " <strong>Comment:</strong> " + data[i].Comment + " <strong>Result:</strong> " + data[i].Result +"</p>";
            matingcontainer.innerHTML = myHTMLString;
        }
    }
}

/* Post mating request */
var reqcontainer = document.getElementById('reqcontainer');
const reqForm = document.getElementById("reqform");

reqForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('POST', '/getmating/');
    ourRequest.setRequestHeader("Content-Type", "application/json");
    ourRequest.onload = function () {
        data = this.responseText;
        console.log(data);
        if (this.status == 200) {
        reqcontainer.innerHTML = 'New mating request received';
         }
    }
    
    var FK_dogID_Male = document.getElementById("FK_dogID_Male").value;
    var FK_dogID_Female = document.getElementById("FK_dogID_Female").value;
    var Comment = document.getElementById("Comment").value;

    var data = JSON.stringify({ "FK_dogID_Male": FK_dogID_Male, "FK_dogID_Female": FK_dogID_Female, "Comment": Comment });

    ourRequest.send(data);

});
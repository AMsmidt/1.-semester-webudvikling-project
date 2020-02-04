/* Update mating request */
function updatemating() {
    var updatecontainer = document.getElementById('updatecontainer');
    var Approved = document.getElementById("Approved").value;
    var Result = document.getElementById("Result").value;
    var MatingID = document.getElementById("MatingID").value;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('PUT', '/getmating/');
    ourRequest.setRequestHeader("Content-Type", "application/json");
    ourRequest.onload = function () {
        data = this.responseText;
        console.log(data);
        if (this.status == 200) {
            updatecontainer.innerHTML = 'Mating request with id: '+ MatingID +' is updated';
         }
    }

    var data = JSON.stringify({ "Approved": Approved, "Result": Result, "MatingID": MatingID });

    ourRequest.send(data);
}

/*delete mating request*/
function deletemating() {
    var deletecontainer = document.getElementById('deletecontainer');
    var MatingIDdel = document.getElementById('MatingIDdel').value;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('DELETE', '/getmating/');
    ourRequest.setRequestHeader("Content-Type", "application/json");
    ourRequest.onload = function () {
        data = this.responseText;
        console.log(data);
        if (this.status == 200) {
            deletecontainer.innerHTML = 'Mating request with id: '+ MatingIDdel +' is deleted';
         }
    }

    var data = JSON.stringify({"MatingIDdel": MatingIDdel});

    ourRequest.send(data);
}
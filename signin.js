var socket = io();

var selectedComputer = -1;

function signin() {
	var sid = document.getElementById('sid').value;
	var message = {"id": sid, "computer": selectedComputer};
	if(selectedComputer == -1) {
		alert('Please select a computer');
		return;
	}
	socket.emit('check student', sid); 	// check if student exists, check if student is already signed in
	socket.on('check success', function(){
		socket.emit('sign in', message);
		alert('student id ' + sid + ' at computer ' + selectedComputer);
		// display student's information
		document.getElementById(selectedComputer).className = "computer taken";
		// clear text box
		selectedComputer = -1;
	});
	socket.on('check fail', function(message){
		alert('error: ' + message);
		// clear text box
	});
}

function chooseComputer(id) {
	if(document.getElementById("signin").checked){
		// check if new computer is already occupied
		if(document.getElementById(id).className != "computer taken") {
			// deselect old computer
			if(selectedComputer != -1) { // if there was already a previously selected computer
				document.getElementById(selectedComputer).className = "computer";
			}
			// select new computer
			selectedComputer = id;
			document.getElementById(id).className = "computer selected";
		}
	} else {
		if(document.getElementById(id).className == "computer taken"){
			if(confirm("Are you sure you want to sign out?")){ // then student information.
				signOut(id);
			}
		}
	}
}

function signOut(id){
	var dest = prompt("Type your destination (cafe, classroom, office)");
	var message = {"computer": id, "destination": dest};
	socket.emit('sign out', message);
	socket.on('sign out success', function(){
		// alert sign out
		// change computer to empty
		document.getElementById(id).className = "computer";
	});
}

function switchTabStyles(tab){
	document.getElementById("map").className=tab;
}
import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

initFirebase();
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		loadUsers(user);
	} else {
		authFirebase();
	}
});


function loadUsers(user) {
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary")
	button.innerHTML = user.displayName;
	document.getElementById("user-button-list").appendChild(button);
	loadSession(user);
}

function loadSession(user) {
	//var currentDate = new Date().toISOString().slice(0,10).split('-').reverse().join('-');
	var newData = firebase.database().ref('data/Total Connections/' + user.uid + '/')
	newData.on('value', function(snapshot) {
		Object.keys(snapshot.val()).forEach(function(date) {
			var button = document.createElement("BUTTON");
			button.setAttribute("class", "btn btn-primary")
			button.innerHTML = date;
			document.getElementById("session-button-list").appendChild(button);
		});
	});
}

//setup firebase connection to fetch data
function initFirebase() {
	// Initialize connection to firebase 
	var config = {
		apiKey: "AIzaSyCGtNp8KH9l9ZAQvYOJ8lNG1sbbzXbfJuk",
		authDomain: "triibe-user-app.firebaseapp.com",
		databaseURL: "https://triibe-user-app.firebaseio.com",
		storageBucket: "triibe-user-app.appspot.com",
		messagingSenderId: "139425671337"
	};
	firebase.initializeApp(config);
}


function authFirebase() {

	var provider = new firebase.auth.GoogleAuthProvider();

	// create new tab to signin and give permission to app
	firebase.auth().signInWithRedirect(provider);

	// Auth by redirection. 
	firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// ...
		}
		// The signed-in user info.
		var user = result.user;
		console.log("Successfully Authenticated");
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		console.log("Error in Authentication");
	});

	// Authenticate with popup, creates a new window for google login.
	/*
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// The email of the user's account used.
	var email = error.email;
	// The firebase.auth.AuthCredential type that was used.
	var credential = error.credential;
	// ...
	});
	*/
}







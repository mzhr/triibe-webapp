import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var exports = module.exports = {};

exports.IPData = [];

exports.initFirebase = function () {
	// Initialize, auto authenticate, and return data when called.
	initFirebase();
	firebase.auth().onAuthStateChanged(function initAuthFirebase(user) {
		if (user) {
			loadUsers();
			exports.IPData = getIPData(document.cookie);
			console.log("Loading Graph");
		} else {
			authFirebase();
		}
	});
}

exports.getIPData = function (session) {
	// All data to be appended to dataSet and returned
	var dataSet = [];

	if (firebase.auth().currentUser != null) {
		// Retrieve all the connection names of the session
		var sessionData = firebase.database().ref('data/Total Connections/' + 
				firebase.auth().currentUser.uid + '/' + session + '/');

		// Add all data into dataSet 
		sessionData.on('value', function ipGetConnections(connections) {
			try {
				Object.keys(connections.val()).forEach(function ipGetConnection(connectionName) {

					// Get the connection name to get its data values
					var connectionData = firebase.database()
						.ref('data/Total Connections/' + firebase.auth().currentUser.uid 
								+ '/' + session + '/' + connectionName  + '/');

					try { 
						// Add a subarray of start time, end time, and url to the dataSet
						connectionData.on('value', function ipConnectionGetTimeURL(connection) {
							var connectionStart = connection.val()['Start Time'];
							var connectionEnd = connection.val()['End Time'];
							var connectionURL = connection.val()['IP Address URL'];
							connectionStart = connectionStart.slice(11, 19);
							connectionEnd = connectionEnd.slice(11, 19);
							dataSet.push([connectionStart, connectionEnd, connectionURL])
						});              
					} catch(err) {
						// do nothing
					}
				});
			} catch(err) {
				// do nothing
			}
		});
	}

	return dataSet;
}

function loadUsers() {
	// Retrieve name and display it as a button
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary")
	button.innerHTML = firebase.auth().currentUser.displayName;
	document.getElementById("user-button-list").appendChild(button);

	// Load all sessions of the user
	loadSession();
}

function loadSession() {
	//var currentDate = new Date().toISOString().slice(0,10).split('-').reverse().join('-');

	// Retrieve all days where data was collected by that user
	var newData = firebase.database().ref('data/Total Connections/' + firebase.auth().currentUser.uid + '/')

	// Show all the days as buttons
	newData.on('value', function sessionGetData(dates) {
		Object.keys(dates.val()).forEach(function sessionAddButton(date) {
			var button = document.createElement("BUTTON");
			button.setAttribute("class", "btn btn-primary")
			button.innerHTML = date;
			button.onclick = function sessionButtonPress() {
				document.cookie = date;
				location.reload(true);
			};
			document.getElementById("session-button-list").appendChild(button);
		});
	});
}


function initFirebase() {
	// Initialize firebase connection config and start
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
	firebase.auth().getRedirectResult().then(function redirectAuth(result) {
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// var token = result.credential.accessToken;
			// ...
		}
		// The signed-in user info.
		// var user = result.user;
		console.log("Successfully Authenticated");
	}).catch(function redirectAuthErr(error) {
		// Handle Errors here.
		// var errorCode = error.code;
		// var errorMessage = error.message;
		// The email of the user's account used.
		// var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		// var credential = error.credential;
		console.log("Error in Authentication");
	});
}


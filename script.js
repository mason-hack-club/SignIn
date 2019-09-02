// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyADpSoSf_rcv-LNUZw23czp9LeY4f6V6xg",
    authDomain: "auth.attendance.masonhackclub.com",
    databaseURL: "https://attendance-902c5.firebaseio.com",
    projectId: "attendance-902c5",
    storageBucket: "attendance-902c5.appspot.com",
    messagingSenderId: "552343475963",
    appId: "1:552343475963:web:6d6563fc36b32f8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//get the secret key that verifies that it came from a valid source
const urlParams = new URLSearchParams(window.location.search);
const skey = urlParams.get('skey');

//make the user sign out on page reload
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });

//sign in function
var initSignIn = function() {
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
};

var provider = new firebase.auth.GoogleAuthProvider();




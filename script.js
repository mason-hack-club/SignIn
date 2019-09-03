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

//once redirected back to mason
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(user.email.split('@')[1] === 'masonohioschools.com') {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            saveAttendanceData(user);
            // window.location.href="post-login";
        }
        // User is signed in with a non-mason account
        user.delete().then(function() {
            firebase.auth().signOut()
        }).catch(function(error) {
            console.log(error);
        });
        document.getElementById('sign-in-buttons').append("<h1>Please Sign In with your Mason Google Account</h1>");
    } else {

    }
});

var saveAttendanceData = function(user) {
    console.log(user);
};

//make the user sign out on page reload
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
    });

//sign in function
var initSignIn = function() {
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        console.log(error);
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
provider.addScope('profile');
provider.addScope('email');
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
// provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
// provider.addScope('https://www.googleapis.com/auth/user.emails.read');
provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
// provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
// provider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');
provider.setCustomParameter({'hd':'masonohioschools.com'});





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
var db = firebase.firestore();

//get the secret key that verifies that it came from a valid source
const urlParams = new URLSearchParams(window.location.search);
const skey = urlParams.get('skey');
const finalLink = urlParams.get('fl');

//once redirected back to mason
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(user.email.split('@')[1] === 'masonohioschools.com') {
            // User is signed in.
            document.getElementById("google-button").style.display = "none";
            if (skey != null) {
                // secret key is defined
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                saveAttendanceData(user, skey);
                //user should get redirected by this function. If it fails, it continues into the next bit
            }
            var alert = document.createElement('h1');
            alert.innerText = "Please scan the QR Code with your phone";
            document.getElementById('sign-in-buttons').prepend(alert);
        } else {
            // User is signed in with a non-mason account
            user.delete().then(function () {
                firebase.auth().signOut()
            }).catch(function (error) {
                console.log(error);
            });
            var alert = document.createElement('h1');
            alert.innerText = "Please Sign In with your Mason Google Account";
            document.getElementById('sign-in-buttons').prepend(alert);
        }
    } else {
        //not signed in yet
    }
});

var saveAttendanceData = function(user, secretKey) {
    //update/save a copy of the user to the Userdata bucket
    //should be able to look at the UserData collection for roster moves
    //might be worth refactoring into pulling their data, analyzing it and merging manually
    db.collection('Userdata').doc(user.email).set({
        name : user.displayName,
        email: user.email,
        phoneNumer: user.phoneNumber,
        uid: user.uid,
        photo: user.photoURL,
        providerData : user.providerData,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
    },{merge:true}).then(function(){
        console.log('userdata successed');
    }).catch(function(error){
        console.log(error);
    });

    //use the skey to create a collection based on a single meeting
    db.collection('SignIns').doc(secretKey).collection('members').doc(user.email).set({
        [user.email]: firebase.firestore.FieldValue.serverTimestamp(),
    },{merge:true}).then(function(){
        //redirect via JS to signed in page
        window.location.href="signed-in/?fl="+finalLink;
    }).catch(function(error){
        console.log(error);
    });
};

//user stays signed in for as log as they can
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function(error) {
        // Handle Errors here.
        console.log(error);
    });

//sign in function
var initSignIn = function() {
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // I haven't done anything here. But you could send them emails or something else
    }).catch(function(error) {
        // Handle Errors here.
        console.log(error);

    });
};

//Now that everything is defined, make auth provider
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

//Encourages people to use Mason account
provider.setCustomParameters({'hd':'masonohioschools.com'});



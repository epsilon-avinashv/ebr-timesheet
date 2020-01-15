// firebase script

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKSHYc8cWpCdJZb60SAKfx1RvjQFD1LkE",
    authDomain: "ebr-timesheet.firebaseapp.com",
    databaseURL: "https://ebr-timesheet.firebaseio.com",
    projectId: "ebr-timesheet",
    storageBucket: "ebr-timesheet.appspot.com",
    messagingSenderId: "298901153823",
    appId: "1:298901153823:web:3255fe25863cee622c4d2a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function register() {

    var userEmail = $("#userEmail").val();
    var userPassword = $("#userPassword").val();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
    alert("success!");
    window.location.href = './timesheet.html';
}

function login() {

    var emailEntered = $("#emailEntered").val();
    var passwordEntered = $("#passwordEntered").val();

    firebase.auth().signInWithEmailAndPassword(emailEntered, passwordEntered).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
    alert("success!");
}


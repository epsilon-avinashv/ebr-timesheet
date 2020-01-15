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

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            alert('Registration Successfull!');
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

function login() {
    var emailEntered = $("#emailEntered").val();
    var passwordEntered = $("#passwordEntered").val();

    firebase.auth().signInWithEmailAndPassword(emailEntered, passwordEntered)
        .then((data) => {
            //console.log(JSON.stringify(data));
            localStorage.setItem("uid", data.user.uid);
            localStorage.setItem("email", data.user.email);
            alert('Login Successfull!');
            window.location.href = './timesheet.html';
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

function logout() {
    firebase.auth().signOut().then(function () {
        console.log('User Logged Out!');
        window.location.href = './index.html';
        localStorage.clear();
    }).catch(function (error) {
        console.log(error);
    });
}

function checkLogin() {
    let localdata = localStorage.getItem('uid');
    if(!localdata){
        alert('User not Authorized');
        window.location.href = './index.html';
    }
}

$(".add-row").click(function () {
    var empId = '12345';
    var name = 'Avinash';
    var competency = 'FED';
    var dateEntry = $("#dateEntry").val();
    var brand = $("#brand").val();
    var team = $("#team").val();
    var projectCode = $("#projectCode").val();
    var activity = $("#activity").val();
    var hours = $("#hours").val();

    var markup = "<tr class='dynamicRow'><td><input type='checkbox' name='record'></td><td>" + empId + "</td><td>" + name + "</td><td>" + competency + "</td><td>" + dateEntry + "</td><td>" + brand + "</td><td>" + team + "</td><td>" + projectCode + "</td><td>" + activity + "</td><td>" + hours + "</td><td>&nbsp;</td></tr>";
    $(".dynamicVal").append(markup);
});

// Find and remove selected table rows
$(".delete-row").click(function () {
    $(".dynamicVal").find('input[name="record"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parents("tr").remove();
        }
    });
});


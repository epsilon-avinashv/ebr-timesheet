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
const db = firebase.firestore();


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
    // let localdata = localStorage.getItem('uid');
    // if (!localdata) {
    //     alert('User not Authorized');
    //     window.location.href = './index.html';
    // }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
        } else {
            alert('User not Authorized');
            window.location.href = './index.html';
        }
    });
}


function renderAssociate(doc) {
    var markup = "<tr class='dynamicRow'><td><input type='checkbox' name='record' class='checkbox' onchange=chkbk('" + doc.id + "') id='" + doc.id + "'></td><td>" + doc.data().empId + "</td><td>" + doc.data().name + "</td><td>" + doc.data().competency + "</td><td>" + doc.data().date + "</td><td>" + doc.data().brand + "</td><td>" + doc.data().team + "</td><td>" + doc.data().projectcode + "</td><td>" + doc.data().activity + "</td><td>" + doc.data().hours + "</td><td>&nbsp;</td></tr>";
    $(".dynamicVal").append(markup);
}

db.collection('associates').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        db.collection('associates').doc(doc.id).collection('timesheet').get().then(snaps => {
            if (snaps.docs == 0) {
                renderAssociate(snaps);
            } else {
                snaps.docs.forEach(shots => {
                    renderAssociate(shots);
                })
            }
        });
    });
});


function writeUserData(empId, name, email, competency, date, brand, team, projectcode, activity, hours) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection('associates').get().then(snapshot => {
                if (snapshot.docs.length == 0) {
                    db.collection('associates').add({
                        empId: empId,
                        name: name,
                        email: email,
                        competency: competency
                    });
                    snapshot.docs.forEach(doc => {
                        if (doc.data().empId == empId) {
                            db.collection('associates').doc(doc.id).collection('timesheet').add({
                                empId: empId,
                                name: name,
                                email: email,
                                competency: competency,
                                date: date,
                                brand: brand,
                                team: team,
                                projectcode: projectcode,
                                activity: activity,
                                hours: hours
                            })
                        }
                    });
                } else {
                    snapshot.docs.forEach(doc => {
                        if (doc.data().empId == empId) {
                            db.collection('associates').doc(doc.id).collection('timesheet').add({
                                empId: empId,
                                name: name,
                                email: email,
                                competency: competency,
                                date: date,
                                brand: brand,
                                team: team,
                                projectcode: projectcode,
                                activity: activity,
                                hours: hours
                            })
                        }
                    });
                }
            });


            // db.collection('associates').add({
            //     empId: empId,
            //     name: name,
            //     email: email,
            //     competency: competency
            // });

            // let appendTimesheet = {
            //     date: date,
            //     brand: brand,
            //     Team: team,
            //     ProjectCode: projectcode,
            //     Activity: activity,
            //     Hours: hours
            // }

            // let ref = firebase.database().ref('associates/' + empId + '/timesheet');
            // ref.push(appendTimesheet, err => console.log(err ? 'error while pushing' : 'successful push'));

        } else {

        }
    });
}

function checkRecords(empId) {

}

$(".add-row").click(function () {
    var empId = '714758';
    var name = 'Avinash Viswanathan';
    var email = localStorage.getItem('email');
    var competency = 'FED';
    var dateEntry = $("#dateEntry").val();
    var brand = $("#brand").val();
    var team = $("#team").val();
    var projectCode = $("#projectCode").val();
    var activity = $("#activity").val();
    var hours = $("#hours").val();
    // var i = Math.floor((Math.random() * 100) + 1);

    // var markup = "<tr class='dynamicRow'><td><input type='checkbox' name='record' class='checkbox' onchange=chkbk('" + i + "') id='" + i + "'></td><td>" + empId + "</td><td>" + name + "</td><td>" + competency + "</td><td>" + dateEntry + "</td><td>" + brand + "</td><td>" + team + "</td><td>" + projectCode + "</td><td>" + activity + "</td><td>" + hours + "</td><td>&nbsp;</td></tr>";
    // $(".dynamicVal").append(markup);

    writeUserData(empId, name, email, competency, dateEntry, brand, team, projectCode, activity, hours);
    db.collection('associates').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderAssociate(doc);
        });
    });
    // setTimeout(function () {
    //     checkRecords(empId);
    // }, 1000)

});

// Find and remove selected table rows
$(".delete-row").click(function () {
    $(".dynamicVal").find('input[name="record"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parents("tr").remove();
        }
    });
});

function chkbk(obj) {

}






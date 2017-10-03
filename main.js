/**
 * Created by hansel.tritama on 10/2/17.
 */
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

firebase.auth().onAuthStateChanged(function (user) {
    window.user = user;
    checkAuth();
    $("#auth-data").html("<pre>${JSON.stringify(user, undefined, 2)}</pre>")
});

$("#sign-in").click(function () {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        window.user = result.user;
        checkAuth();
    }).catch(function (error) {
        console.log(error);
    });
});

$("#sign-out").click(function () {
    firebase.auth().signOut();
    console.log("you are logged out!");
});

function checkAuth(){
    if(window.user){
        $("#sign-in").hide();
        $("#sign-out").show();
    }
    else
    {
        $("#sign-in").show();
        $("#sign-out").hide();
    }
}

checkAuth();
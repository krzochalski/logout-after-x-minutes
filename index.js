var loginForm = document.getElementById('login-form');
var alertLoggedIn = document.getElementById('alert-loggedin');
var alertLoggedOut = document.getElementById('alert-loggedout');

function checkIfLogged() {
    if (localStorage.getItem('loginTime') !== null) {
        console.log('is logged');
        loginForm.style.display = 'none';
        alertLoggedIn.style.display = 'block';
        alertLoggedOut.style.display = 'none';
    } else {
        console.log('not logged');
        loginForm.style.display = 'block';
        alertLoggedIn.style.display = 'none';
        alertLoggedOut.style.display = 'block';
    }
}

function logout(event) {
    event.preventDefault();

    localStorage.clear();
    checkIfLogged();
}

function logIn(event) {
    event.preventDefault();

    var login = document.getElementById('login-email').value,
        loginTime = Date.now();

    localStorage.setItem('loginName', login);
    localStorage.setItem('loginTime', loginTime);

    checkIfLogged();
}

window.onload = function () {
    var time = 5;

    checkIfLogged();
    logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
};
var loginForm = document.getElementById('login-form');
var alertLoggedIn = document.getElementById('alert-loggedin');
var alertLoggedOut = document.getElementById('alert-loggedout');
var alertTime = document.getElementById('alert-time');
var alertTimeCount = document.getElementById('alert-time-count');

function checkIfLogged() {
    if (localStorage.getItem('loginTime') !== null) {
        console.log('is logged');
        loginForm.style.display = 'none';
        alertLoggedIn.style.display = 'block';
        alertLoggedOut.style.display = 'none';
        alertTime.style.display = 'block';
    } else {
        console.log('not logged');
        loginForm.style.display = 'block';
        alertLoggedIn.style.display = 'none';
        alertLoggedOut.style.display = 'block';
        alertTime.style.display = 'none';
    }
}

function clickLogout(event) {
    event.preventDefault();
    logout();
}

function logout() {
    localStorage.removeItem('loginName');
    localStorage.removeItem('loginTime');
    checkIfLogged();
}

function logIn(event) {
    event.preventDefault();

    var login = document.getElementById('login-email').value,
        loginTime = Date.now(),
        loginTimeUntilLogin = document.getElementById('login-time').value;

    localStorage.setItem('loginName', login);
    localStorage.setItem('loginTime', loginTime);
    localStorage.setItem('loginTimeUntilLogin', loginTimeUntilLogin);

    checkIfLogged();
    displayTimeToLogout(Number(localStorage.getItem('loginTimeUntilLogin')));
}

function countTimeToLogout(loginTime, timeUntilLogout) {
    var reloadTime = Date.now(),
        timeDifference = reloadTime - loginTime,
        timeUntilLastLogin = timeDifference / 60000,
        timerUntilLogout = timeUntilLogout - timeUntilLastLogin;

    alertTimeCount.innerHTML = timerUntilLogout;
    return timerUntilLogout;
}

function displayTimeToLogout() {
    var time = Number(localStorage.getItem('loginTimeUntilLogin'));
    var interval = 0;
    countTimeToLogout(localStorage.getItem('loginTime'), time);
    interval = setInterval(function () {
        countTimeToLogout(localStorage.getItem('loginTime'), time);
        console.log('interval');
        if (countTimeToLogout(localStorage.getItem('loginTime'), time) <= 0) {
            clearInterval(interval);
            logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
        }
    }, 1000);

    logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
}

window.onload = function () {
    checkIfLogged();
    displayTimeToLogout();

    // logoutAfterXMinutes can also be called in window.onload for performance reasons
    // logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
};
var HTMLComponent = {
    loginForm: document.getElementById('login-form'),
    alertLoggedIn: document.getElementById('alert-loggedin'),
    alertLoggedOut: document.getElementById('alert-loggedout'),
    alertProgress: document.getElementById('alert-progress')
};

var DOMManager = {
    show: function (element) {
        element.style.display = 'block';
    },
    hide: function (element) {
        element.style.display = 'none';
    },
    setWidth: function (element, width) {
        element.style.width = width;
    }
};

var Authentication = {
    checkIfLogged: function() {
        if (localStorage.getItem('loginTime') !== null) {
            DOMManager.hide(HTMLComponent.loginForm);
            DOMManager.show(HTMLComponent.alertLoggedIn);
            DOMManager.hide(HTMLComponent.alertLoggedOut);
            Count.displayTimeToLogout();
        } else {
            DOMManager.show(HTMLComponent.loginForm);
            DOMManager.hide(HTMLComponent.alertLoggedIn);
            DOMManager.show(HTMLComponent.alertLoggedOut);
        }
    },

    logIn: function (event) {
        event.preventDefault();

        var login = document.getElementById('login-email').value,
            loginTime = Date.now(),
            loginTimeUntilLogin = document.getElementById('login-time').value;

        localStorage.setItem('loginName', login);
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('loginTimeUntilLogin', loginTimeUntilLogin);

        Authentication.checkIfLogged();
        Count.displayTimeToLogout(Number(localStorage.getItem('loginTimeUntilLogin')));
    },

    logout: function () {
        localStorage.removeItem('loginName');
        localStorage.removeItem('loginTime');
        Authentication.checkIfLogged();
    },

    clickLogout: function (event) {
        event.preventDefault();
        Authentication.logout();
    }
};

var Count = {
    countTimeToLogout: function (loginTime, timeUntilLogout) {
        var reloadTime = Date.now(),
            timeDifference = reloadTime - loginTime,
            timeUntilLastLogin = timeDifference / 60000,
            timerUntilLogout = timeUntilLogout - timeUntilLastLogin,
            timerUntilLogoutPercent = function () {
                return (timerUntilLogout * 100) / timeUntilLogout;
            };

        DOMManager.setWidth(HTMLComponent.alertProgress, timerUntilLogoutPercent() + '%');

        return timerUntilLogout;
    },

    displayTimeToLogout: function () {
        var time = Number(localStorage.getItem('loginTimeUntilLogin')),
            interval = 0;

        Count.countTimeToLogout(localStorage.getItem('loginTime'), time);

        interval = setInterval(function () {
            Count.countTimeToLogout(localStorage.getItem('loginTime'), time);

            if (Count.countTimeToLogout(localStorage.getItem('loginTime'), time) <= 0) {
                clearInterval(interval);
                logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
            }
        }, 1000);

        logoutAfterXMinutes(localStorage.getItem('loginTime'), time);
    }
};

window.onload = function () {
    Authentication.checkIfLogged();
};
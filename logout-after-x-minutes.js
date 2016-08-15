function logoutAfterXMinutes(loginTime, timeUntilLogout) {
    var reloadTime = Date.now(),
        timeDifference = reloadTime - loginTime,
        timeUntilLastLogin = timeDifference / 60000;

    if (localStorage.getItem('loginTime') === null) {
        return false;
    }

    if (timeUntilLastLogin >= timeUntilLogout) {
        localStorage.clear();
        alert(timeUntilLogout + ' minutes since last login has passed. User was logged out automatically.');

        if (Authentication.logout() !== undefined) {
            Authentication.logout();
            Authentication.checkIfLogged();
        }
    }
}
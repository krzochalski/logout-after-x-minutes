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
        if (logout() !== undefined) {
            logout();
            checkIfLogged();
        }
    } else {
        console.log('User is about to be logged out in ' + (timeUntilLogout - timeUntilLastLogin) + ' minutes.');
    }
}
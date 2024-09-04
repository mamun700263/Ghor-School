
document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken');
    const navElement = document.getElementById("profile_login");
    console.log(authToken);

    if (authToken) {

        navElement.innerHTML = `
            <li class="nav-item mx-2">
                <a class="btn btn-success" href="profile.html">Profile</a>
            </li>
            <li class="nav-item mx-2">
                <a class="btn btn-primary" href="#" id="logout">Logout</a>
            </li>
        `;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('authToken'); 
            window.location.href = 'login.html'; 
        });
    } else {
        // User is not logged in
        navElement.innerHTML = `
            <li class="nav-item mx-2">
                <a class="btn btn-primary" href="login.html">Login</a>
            </li>
            <li class="nav-item mx-2">
                <a class="btn btn-success" href="registration.html">Sign Up</a>
            </li>
        `;
    }
});

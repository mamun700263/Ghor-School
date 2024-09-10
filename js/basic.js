// Set up the API URLs
const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = "https://online-school-1wkk.onrender.com";

const imgbbApiKey = "0582ac2891ffebcd2e07d50f6e11524a"; 
const profileApiUrl = `${baseUrl}/accounts/profile/`;
let Account_id = 0;

// footer section starts
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

// footer section ends

document.addEventListener('DOMContentLoaded', async () => {
    const authToken = localStorage.getItem('authToken');
    const navElement = document.getElementById("profile_login");

    if (authToken) {
        try {
            const response = await fetch(profileApiUrl, {
                headers: {
                    'Authorization': `Token ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const link = data.profile_picture || 'images/User-Profile-PNG-Clipart.png';

            navElement.innerHTML = `
                <a href="profile.html">
                    <img src="${link}" alt="Profile Picture" style="
                        width: 50px; 
                        height: 50px; 
                        border-radius: 50%; 
                        cursor: pointer; 
                        object-fit: cover;
                    ">
                </a>
            `;
        } catch (error) {
            console.error('Error: from basic.js', error);
        }
    } else {
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

const link = document.createElement('link');
link.rel = 'shortcut icon';
link.href = 'images/logo.webp';
link.type = 'image/x-icon';
document.head.appendChild(link);

const teacher_id = Account_id;
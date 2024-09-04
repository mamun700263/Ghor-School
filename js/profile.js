
// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "https://online-school-1wkk.onrender.com";
const profileApiUrl = `${baseUrl}/accounts/profile/`;
document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData();
});

function fetchProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if no token
        return;
    }

    fetch(profileApiUrl, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Check if the data object has the expected properties and handle empty values
        document.getElementById('profile-picture').src = data.profile_picture || 'path/to/default_picture.jpg';
        document.getElementById('profile-name').innerText = data.username || 'No name';
        document.getElementById('profile-role').innerText = 'Role'; // You may need to update this based on user role
        document.getElementById('username').innerText = data.username || 'No username';
        document.getElementById('email').innerText = data.email || 'No email';
        document.getElementById('mobile').innerText = data.mobile || 'No mobile';
        document.getElementById('date_of_birth').innerText = data.date_of_birth || 'No date of birth';
        document.getElementById('unique_id').innerText = data.unique_id || 'No unique ID';

        // Populate the update profile form with user data
        document.getElementById('username-input').value = data.username || '';
        document.getElementById('email-input').value = data.email || '';
        document.getElementById('mobile-input').value = data.mobile || '';
        document.getElementById('date_of_birth-input').value = data.date_of_birth || '';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('update-message').innerText = 'Failed to load profile data.';
    });
}

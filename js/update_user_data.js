document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData();
    document.getElementById('update-profile-form').addEventListener('submit', (event) => {
        event.preventDefault();
        updateProfileData();
    });

});




// Fetch profile data
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
        // Populate form fields with current data
        console.log(data);
        document.getElementById('username-input').value = data.username || '';
        document.getElementById('first_name-input').value = data.first_name || '';
        document.getElementById('last_name-input').value = data.last_name || '';
        document.getElementById('email-input').value = data.email || '';
        document.getElementById('mobile-input').value = data.mobile || '';
        document.getElementById('date_of_birth-input').value = data.date_of_birth || '';




    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('update-message').innerText = 'Failed to load profile data.';
    });
}












// Update profile data
function updateProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const formData = new FormData(document.getElementById('update-profile-form'));

    fetch(profileApiUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update profile.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('update-message').innerText = 'Profile updated successfully.';
        fetchProfileData(); // Refresh profile data
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('update-message').innerText = 'Failed to update profile.';
    });
}



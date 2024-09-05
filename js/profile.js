// Set up the API URLs
const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = "https://online-school-1wkk.onrender.com";

const profileApiUrl = `${baseUrl}/accounts/profile/`;
// import { baseUrl } from "./basic";
// Run these functions when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData();

    // Handle the form submission for updating profile
    document.getElementById('update-profile-form').addEventListener('submit', (event) => {
        event.preventDefault();
        updateProfileData();
    });

    // Handle profile picture upload
    document.getElementById('profile-picture').addEventListener('click', () => {
        document.getElementById('profile-picture-input').click();
    });

    document.getElementById('profile-picture-input').addEventListener('change', (event) => {
        uploadProfilePicture(event.target.files[0]);
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
        document.getElementById('profile-picture').src = data.profile_picture || 'images/User-Profile-PNG-Clipart.png';
        document.getElementById('profile-name').innerText = data.username || 'No name';
        
        let role = data.unique_id.startsWith('ST') ? 'Student' : 'Teacher';
        document.getElementById('profile-role').innerText = role;

        document.getElementById('username').innerText = data.username || 'No username';
        document.getElementById('email').innerText = data.email || 'No email';
        document.getElementById('mobile').innerText = data.mobile || 'No mobile';
        document.getElementById('date_of_birth').innerText = data.date_of_birth || 'No date of birth';
        document.getElementById('unique_id').innerText = data.unique_id || 'No unique ID';
        
        document.getElementById('username-input').value = data.username || '';
        document.getElementById('email-input').value = data.email || '';
        document.getElementById('mobile-input').value = data.mobile || '';
        document.getElementById('date_of_birth-input').value = data.date_of_birth || '';

        if(role === 'Teacher') {
            document.getElementById("upload").innerHTML = '<a href="upload_course.html" class="btn btn-warning" >Upload Course</a>';
        }
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

// Upload profile picture to imgbb and update backend
function uploadProfilePicture(file) {
    const apiKey = '0582ac2891ffebcd2e07d50f6e11524a';
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const formData = new FormData();
    formData.append('image', file);

    fetch(imgbbUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status_code === 200) {
            const imageUrl = data.data.url;
            document.getElementById('profile-picture').src = imageUrl;

            // Update profile picture in the backend
            updateProfilePictureInBackend(imageUrl);
        } else {
            throw new Error(`Upload failed: ${data.error.message}`);
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        document.getElementById('update-message').innerText = 'Failed to upload profile picture.';
    });
}

// Update profile picture URL in the backend
function updateProfilePictureInBackend(imageUrl) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const formData = new FormData();
    formData.append('profile_picture', imageUrl);

    fetch(profileApiUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update profile picture.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('update-message').innerText = 'Profile picture updated successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('update-message').innerText = 'Failed to update profile picture.';
    });
}


const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
document.addEventListener('DOMContentLoaded', () => {
    fetchProfileData();

    // Handle profile picture upload trigger
    document.getElementById('edit-profile-picture').addEventListener('click', () => {
        document.getElementById('profile-upload').click(); // Trigger file input click
    });

    // Handle file upload after user selects a file
    document.getElementById('profile-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadProfilePicture(file);
        }
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
        console.log(data);
        document.getElementById('profile-picture').src = data.profile_picture || 'images/User-Profile-PNG-Clipart.png';
        document.getElementById('profile-name').innerText = data.username || 'No name';
        document.getElementById('username').innerText = data.username || 'No username';
        document.getElementById('full-name').innerText = data.full_name || 'Full name ';
        document.getElementById('email').innerText = data.email || 'No email';
        document.getElementById('mobile').innerText = data.mobile || 'No mobile';
        document.getElementById('date_of_birth').innerText = data.date_of_birth || 'No date of birth';
        document.getElementById('unique_id').innerText = data.unique_id || 'No unique ID';

        let role = data.unique_id.startsWith('ST') ? 'Student' : 'Teacher';
        document.getElementById('profile-role').innerText = role;

        if(role === 'Teacher') {
            document.getElementById("upload_course").innerHTML = '<a href="upload_course.html" class="dropdown-item">Upload Course</a>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('update-message').innerText = 'Failed to load profile data.';
    });
}



// Upload profile picture to imgbb and update backend
function uploadProfilePicture(file) {

    const formData = new FormData();
    formData.append('image', file);

    fetch(imgbbUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from imgbb:", data); // Log the full response for debugging
        
        if (data.status === 200 || data.success) { // Corrected the condition to check 'status' or 'success' field
            const imageUrl = data.data.url; // Image URL
            document.getElementById('profile-picture').src = imageUrl;
            updateProfilePictureInBackend(imageUrl);
        } else {
            throw new Error(`Upload failed: ${data.error.message || "Unknown error"}`);
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        document.getElementById('update-message').innerText = `Failed to upload profile picture. Error: ${error.message}`;
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


document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('authToken'); 
    window.location.href = 'login.html'; 
});
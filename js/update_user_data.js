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
        let dateObj = new Date();
            let month = String(dateObj.getMonth() + 1)
                .padStart(2, '0');
                
            let day = String(dateObj.getDate())
                .padStart(2, '0');
            let year = dateObj.getFullYear();
            let output = year + '-' + month + '-' + day;

        document.getElementById('username-input').value = data.username || '';
        document.getElementById('first_name-input').value = data.first_name || '';
        document.getElementById('last_name-input').value = data.last_name || '';
        document.getElementById('email-input').value = data.email || '';
        document.getElementById('mobile-input').value = data.mobile || '';
        document.getElementById('date_of_birth-input').value = data.date_of_birth || output;




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
document.getElementById('mobile-input').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');  // Replace any non-digit character
});



document.getElementById('update-profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately
    const loader = document.getElementById('loader');
    const body = document.body;
    const errorMessage = document.getElementById('error-message2');

    // Show loader and add blur effect to the body
    loader.style.display = 'block';
    body.classList.add('blurred'); // Add the blurred class to the body

    // Simulate login process (replace with actual login logic)
    setTimeout(() => {
        // After the simulated delay, hide the loader and remove blur effect
        loader.style.display = 'none';
        body.classList.remove('blurred'); // Remove the blurred class

        // Simulate success or error handling (replace with actual server response handling)
        const success = Math.random() > 0.5; // Simulate random success/failure

        if (!success) {
           // Show an error message
            errorMessage.textContent = 'Please check your inputs';
        } 
    }, 2000); // Simulate 2 seconds delay, replace with actual login request duration
});

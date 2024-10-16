
const loginApiUrl = `${baseUrl}/accounts/login/`;

document.getElementById('login-form').addEventListener('submit', submitLoginForm);

function submitLoginForm(event) {
    event.preventDefault();

    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.innerText = ''; // Clear any previous error messages
    }

    const formData = {
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value.trim()
    };

    // Perform client-side validation
    if (!formData.username || !formData.password) {
        if (errorMessageElement) {
            errorMessageElement.innerText = 'Please fill in all fields.';
        }
        return;
    }

    fetch(loginApiUrl, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || `HTTP error! Status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user_id);
            window.location.href = 'profile.html'; // Ensure this is the correct redirect URL
        } else {
            if (errorMessageElement) {
                errorMessageElement.innerText = data.error || 'Login failed';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (errorMessageElement) {
            errorMessageElement.innerText = 'Invalid username or password';
        }
    });
}



document.getElementById('login-form').addEventListener('submit', function(event) {
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
            errorMessage.textContent = 'Invalid username or password';
        } 
    }, 2000); // Simulate 2 seconds delay, replace with actual login request duration
});

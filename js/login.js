const baseUrl = "https://online-school-1wkk.onrender.com";
// const baseUrl = "http://127.0.0.1:8000";
const loginApiUrl = `${baseUrl}/accounts/login/`;

document.getElementById('login-form').addEventListener('submit', submitLoginForm);

function submitLoginForm(event) {
    event.preventDefault();

    // Get the error message element
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        // Clear any previous error messages
        errorMessageElement.innerText = '';
    }

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user_id);
            window.location.href = 'profile.html';
        } else {
            if (errorMessageElement) {
                errorMessageElement.innerText = data.error || 'Login failed';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (errorMessageElement) {
            errorMessageElement.innerText = 'An error occurred during login';
        }
    });
}

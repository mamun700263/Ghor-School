const studentApiUrl = `${baseUrl}/accounts/student/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher/`;

document.getElementById('registration-form').addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault(); 

    const errorMessageElement = document.getElementById('registration-error-message');
    if (errorMessageElement) {
        errorMessageElement.innerText = ''; // Clear any previous error messages
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password strength validation
    if (!isValidPassword(password)) {
        errorMessageElement.innerText = 'Password must be at least 8 characters long and include a combination of uppercase letters, lowercase letters, numbers, and special characters as !@#$%^&*(),.?":{}|<>.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessageElement.innerText = 'Passwords do not match!';
        return;
    }

    const formData = {
        user: {
            username: document.getElementById('username').value,
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: password,
            confirm_password: confirmPassword 
        },
        mobile: document.getElementById('mobile').value,
    };

    let apiUrl;
    if (document.querySelector('input[name="userType"]:checked').value === "student") {
        apiUrl = studentApiUrl;
    } else if (document.querySelector('input[name="userType"]:checked').value === "teacher") {
        apiUrl = teacherApiUrl;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html'; 
        } else {
            errorMessageElement.innerText = data.message || 'Username or email unavailable';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessageElement.innerText = 'An error occurred during registration.';
    });
}

// Function to validate password strength
function isValidPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}








document.getElementById('registration-form').addEventListener('submit', function(event) {
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
    }, 5000); // Simulate 2 seconds delay, replace with actual login request duration
});

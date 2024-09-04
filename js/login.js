// const baseUrl = "https://online-school-1wkk.onrender.com";
const baseUrl = "http://127.0.0.1:8000";
const studentApiUrl = `${baseUrl}/accounts/student/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher/`;


const loginApiUrl = `${baseUrl}/accounts/login/`;


document.getElementById('login-form').addEventListener('submit', submitLoginForm);

function submitLoginForm(event) {
    event.preventDefault(); 

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch(`${baseUrl}/accounts/login/`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user_id);
            window.location.href = 'profile.html';
        } else {
            document.getElementById('error-message').innerText = data.error || 'Login failed';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').innerText = 'An error occurred during login';
    });
}




// Function to get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const skillsApiUrl = `${baseUrl}/skill/skills/`;
const courseId = getQueryParam('id');
const courseApiUrl = `${baseUrl}/skill/courses/${courseId}/`;
let error_message = document.getElementById("error-message");
let loader = document.getElementById('loader');
let errorMessage = document.getElementById('error-message2');

// Fetch course details and populate the form
fetch(courseApiUrl)
    .then(response => response.json())
    .then(async course => {
        console.log(course.skills_list);
        document.getElementById('course-update').innerHTML = `
        <form id="update-course-form" class="form-container">
            <div class="course-info">
                <h1><strong>${course.name}</strong></h1>
                <div class="info-container">
                    <div class="course-details w-50">
                        <div class="form-group">
                            <label for="name-input">Course Name:</label>
                            <input type="text" id="name-input" class="form-control" value="${course.name}" />
                        </div>
                        <div class="form-group">
                            <label for="time-input">Time (in hours):</label>
                            <input type="number" id="time-input" class="form-control" value="${course.time}" />
                        </div>
                        <div class="form-group">
                            <label for="price-input">Price:</label>
                            <input type="number" id="price-input" class="form-control" value="${course.price || ''}" />
                        </div>
                        <div class="form-group">
                            <label for="paid-input">Paid:</label>
                            <select id="paid-input" class="form-control">
                                <option value="true" ${course.paid ? 'selected' : ''}>Paid</option>
                                <option value="false" ${!course.paid ? 'selected' : ''}>Free</option>
                            </select>
                        </div>
                        <div class="skills-list">
                            <label>Skills:</label>
                            ${course.skills_list.map(skill => `<span class="badge badge-secondary text-dark">${skill.name}</span>`).join(' ')}
                        </div>
                        <div class="mb-3">
                            <select multiple class="form-control" id="skills-input" name="skills"></select>
                        </div>
                    </div>
                    <div class="course-description w-50">
                        <div class="form-group">
                            <label for="description-input">Description:</label>
                            <textarea id="description-input" class="form-control">${course.description}</textarea>
                        </div>
                    </div>
                </div>
                <div class="d-flex ">
                <button type="submit" class="btn btn-primary mx-1" id="update-course-btn">Update Course</button>
                <button type="button" id="delete-course-btn" class="btn btn-danger mx-1">Delete Course</button>
            </div>
            </div>
        </form>
        `;

        // Fetch and populate skills
        const skillsInput = document.getElementById('skills-input');
        try {
            const response = await fetch(skillsApiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch skills.');
            }
            const skills = await response.json();
            skills.forEach(skill => {
                const option = document.createElement('option');
                option.value = skill.id;
                option.textContent = skill.name;
                skillsInput.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching skills:', error);
        }

        // Update course data on form submission
        document.getElementById('update-course-form').addEventListener('submit', (event) => {
            event.preventDefault();
            loader.style.display = 'block'; // Show loader

            let selectedSkills = Array.from(document.getElementById('skills-input').selectedOptions).map(option => option.value);
            console.log('before edit', selectedSkills);

            const updatedCourseData = {
                name: document.getElementById('name-input').value,
                time: document.getElementById('time-input').value,
                price: document.getElementById('price-input').value || 0,
                paid: document.getElementById('paid-input').value === 'true',
                description: document.getElementById('description-input').value,
                skills: selectedSkills,
            };

            updateCourse(courseId, updatedCourseData);
            location.reload(); 
        });

        // Handle delete course action
        document.getElementById('delete-course-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this course?')) {
                deleteCourse(courseId);
                window.location.href = 'profile.html'; // Redirect to profile.html after the course is deleted
            }
            
        });
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
        document.getElementById('course-update').innerHTML = '<p>Error loading course details.</p>';
    });








// Function to update course
function updateCourse(courseId, updatedCourseData) {
    const updateUrl = `${baseUrl}/skill/course_update/${courseId}/`;
    const token = localStorage.getItem('authToken');

    fetch(updateUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(updatedCourseData),
    })
    .then(response => response.json().then(data => 
        ({status: response.status, data})))
    .then(({status, data}) => {
        console.log(data)
        loader.style.display = 'none'; // Hide loader
        location.reload(); 

        if (status === 200) {
            // alert('Course updated successfully!');
            errorMessage.innerHTML = `Course updated successfully!</p>`;
            console.log(data);
        } else {
            console.error('Error:', data);
            errorMessage.innerHTML = `<p>Error: ${data.error || 'Failed to update course'}</p>`;
        }
    })
    .catch(error => {
        loader.style.display = 'none'; // Hide loader
        // console.error('Error:', error);
        errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}



document.getElementById('update-course-form').addEventListener('submit', function(event) {
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


















// Function to delete course
function deleteCourse(courseId) {
    const deleteUrl = `${baseUrl}/skill/course_update/${courseId}/`;
    const token = localStorage.getItem('authToken');

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
    .then(response => {
        loader.style.display = 'none'; // Hide loader

        if (response.status === 204) {
            error_message.innerHTML = '<h3>Course deleted successfully!</h3>';
            window.location.href = 'profile.html'; // Redirect to profile page
        } else {
            throw new Error('Failed to delete course');
        }
        location.reload(); 
    })
    .catch(error => {
        loader.style.display = 'none'; // Hide loader
        error_message.innerHTML = `<h3>Error deleting the course</h3>`;
        console.error('Error:', error);
    });
}

// Helper to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(`${name}=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

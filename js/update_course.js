function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const courseId = getQueryParam('id');
const courseApiUrl = `${baseUrl}/skill/courses/${courseId}/`;


fetch(courseApiUrl)
    .then(response => response.json())
    .then(course => {
        document.getElementById('course-update').innerHTML = `
        <form id="update-course-form" class="form-container">
            <div class="course-info">
                <h1>Edit Course: ${course.name}</h1>
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
                            ${course.skills_list.map(skill => `<span class="badge badge-secondary">${skill.name}</span>`).join(' ')}
                        </div>
                    </div>
                    <div class="course-description w-50">
                        <div class="form-group">
                            <label for="description-input">Description:</label>
                            <textarea id="description-input" class="form-control">${course.description}</textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Update Course</button>
                <button type="button" id="delete-course-btn" class="btn btn-danger">Delete Course</button>
            </div>
        </form>
        `;

        // Handle update form submission
        document.getElementById('update-course-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const updatedCourseData = {
                name: document.getElementById('name-input').value,
                time: document.getElementById('time-input').value,
                price: document.getElementById('price-input').value || 0,
                paid: document.getElementById('paid-input').value === 'true',
                description: document.getElementById('description-input').value,
            };

            updateCourse(courseId, updatedCourseData);
        });

        // Handle delete course action
        document.getElementById('delete-course-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this course?')) {
                deleteCourse(courseId);
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
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(updatedCourseData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Course updated successfully!');
        console.log(data);
    })
    .catch(error => {
        alert('Failed to update course.');
        // console.error('Error:', error);
        // console.log('Error:', error);
        console.log(error);
    })
    ;
}

// Function to delete course
function deleteCourse(courseId) {
    const deleteUrl = `${baseUrl}/skill/course_update/${courseId}/`;
    const token = localStorage.getItem('authToken');

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => {
        if (response.status === 204) {
            alert('Course deleted successfully!');
            window.location.href = 'profile.html';  // Redirect to the courses page
        } else {
            throw new Error('Failed to delete course');
        }
    })
    .catch(error => {
        alert('Error deleting course.');
        console.error('Error:', error);
    });
}

// Helper to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
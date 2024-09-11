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
                    ${course.skills_list.map(skill => `<span>${skill.name}</span>`).join('')}
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
    </div>
</form>
        `;

        // Add event listener for form submission
        document.getElementById('update-course-form').addEventListener('submit', (event) => {
            event.preventDefault();
            
            const updatedCourseData = {
                name: document.getElementById('name-input').value,
                time: document.getElementById('time-input').value,
                price: document.getElementById('price-input').value,
                paid: document.getElementById('paid-input').value === 'true',
                description: document.getElementById('description-input').value,
            };

            updateCourse(courseId, updatedCourseData);
        });
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
        document.getElementById('course-update').innerHTML = '<p>Error loading course details.</p>';
    });
function updateCourse(courseId, updatedCourseData) {
        const updateUrl = `${baseUrl}/skill/course_update/${courseId}/`;
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage (or wherever you're storing it)
    
        fetch(updateUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,  // Add the Authorization header with the token
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token if CSRF protection is enabled
            },
            body: JSON.stringify(updatedCourseData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { 
                    throw new Error(err.detail || 'Error updating course');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Course updated successfully!');
            // Optionally, redirect the user or refresh the page
        })
        .catch(error => {
            console.error('Error updating course:', error);
            alert('Failed to update course. ' + error.message);
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



// const studentApiUrl = `${baseUrl}/accounts/student_list/`;
// const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
// const skillApiUrl = `${baseUrl}/skill/skills/`;
// const courseApiUrl = `${baseUrl}/skill/courses/list/`;







// JavaScript to fetch course data
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const courseId = getQueryParam('id');
const courseApiUrl = `${baseUrl}/skill/courses/${courseId}/`;

fetch(courseApiUrl)
    .then(response => response.json())
    .then(course => {
        document.getElementById('course-detail').innerHTML = `<div class="course-container m-auto border rounded shadow-sm p-3 mb-4">
    <div class="row">
        <div class="col-md-4">
            <img src="${course.thumbnail}" alt="Course Thumbnail" class="course-thumbnail img-fluid rounded" />
        </div>
        <div class="col-md-8">
            <div class="instructor d-flex align-items-center mb-3">
                <img src="${course.taken_by_img}" alt="Instructor Image" class="instructor-image rounded-circle me-2" />
                <p class="mb-0"><strong>Instructor:</strong> ${course.taken_by_name}</p>
            </div>

            <div class="course-info">
                <h2 class="mb-3">${course.name}</h2>
                <div class="info-container d-flex justify-content-between">
                    <div class="course-details">
                        <p><strong>Time:</strong> ${course.time} hours</p>
                        <p><strong>Price:</strong> ${course.paid ? `$${course.price}` : 'Free'}</p>
                    </div>
                    <div class="skills-list">
                        <strong>Skills:</strong> 
                        ${course.skills_list.map(skill => `<span class="badge bg-secondary me-1">${skill.name}</span>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Collapsible Description -->
            <button class="btn btn-link mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#course-description-${course.id}" aria-expanded="false" aria-controls="course-description-${course.id}">
                View Description
            </button>
            <div id="course-description-${course.id}" class="collapse">
                <div class="course-description mt-3">
                    <p><strong>Description:</strong> ${course.description}</p>
                </div>
            </div>

                <!-- Enroll Button -->
            <div class="enroll-container">
                <button class="enroll-button btn-primary" onclick="enrollCourse(${course.id})">Enroll</button>
                <p id="enroll-message"></p>
            </div>
        </div>
    </div>
</div>

        `;
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
        document.getElementById('course-detail').innerHTML = '<p>Error loading course details.</p>';
    });



    function enrollCourse(courseId) {
        const token = localStorage.getItem('authToken'); // Assuming you store your auth token in local storage
        const enrollApiUrl = `${baseUrl}/skill/enroll/${courseId}/`; // Replace with your actual endpoint
    
        fetch(enrollApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* any additional data if needed */ })
        })
        .then(response => response.json())
        .then(data => {
            const messageElement = document.getElementById('enroll-message');
            if (data.success) {
                messageElement.innerText = 'Successfully enrolled in the course!';
                messageElement.style.color = 'green';
            } else {
                messageElement.innerText = data.message || 'Failed to enroll in the course.';
                messageElement.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error enrolling in course:', error);
            const messageElement = document.getElementById('enroll-message');
            messageElement.innerText = 'You are already enrolled in the course';
            messageElement.style.color = 'red';
        });
    }
    


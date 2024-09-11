

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
        document.getElementById('course-detail').innerHTML = `
<div class="course-container m-auto">
    <img src="${course.thumbnail}" alt="Course Thumbnail" class="course-thumbnail" />
    <div class="course-info">
        <h1>${course.name}</h1>
        <div class="info-container">
            <div class="course-details w-50">
                <p><strong>Time:</strong> ${course.time} hours</p>
                <p><strong>Price:</strong> ${course.paid ? `$${course.price}` : 'Free'}</p>
                <div class="instructor">
                    <img src="${course.taken_by_img}" alt="Instructor Image" class="instructor-image" />
                    <p><strong>Instructor:</strong> ${course.taken_by_name}</p>
                </div>
                <div class="skills-list">
                    <strong>Skills:</strong> ${course.skills_list.map(skill => `<span>${skill.name}</span>`).join('')}
                </div>
            </div>
            <div class="course-description w-50">
                <p><strong>Description:</strong> ${course.description}</p>
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






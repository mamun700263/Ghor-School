

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
const courseApiUrl = `http://127.0.0.1:8000/skill/courses/${courseId}/`;

fetch(courseApiUrl)
    .then(response => response.json())
    .then(course => {
        document.getElementById('course-detail').innerHTML = `
            <img src="${course.thumbnail}" alt="Course Thumbnail" class="course-thumbnail" />
            <div class="course-info">
                <h1>${course.name}</h1>
                <p><strong>Description:</strong> ${course.description}</p>
                <p><strong>Time:</strong> ${course.time} hours</p>
                <p><strong>Price:</strong> ${course.paid ? `$${course.price}` : 'Free'}</p>
                <div class="instructor">
                    <img src="${course.taken_by_img}" alt="Instructor Image" />
                    <p><strong>Instructor:</strong> ${course.taken_by_name}</p>
                </div>
                <div class="skills-list">
                    <strong>Skills:</strong> ${course.skills_list.map(skill => `<span>${skill.name}</span>`).join('')}
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
        document.getElementById('course-detail').innerHTML = '<p>Error loading course details.</p>';
    });











// // // Function to fetch and display student data
// // const fetchStudents = () => {
// //     fetch(studentApiUrl)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error('Network response was not ok');
// //             }
// //             return response.json();  // Parse JSON from the response
// //         })
// //         .then(data => {
// //             console.log("Student Data:", data);  // Log the fetched data
// //         })
// //         .catch(error => {
// //             console.error('Error fetching student data:', error);  // Log any errors
// //         });
// // };

// // // Function to fetch and display teacher data
// // const fetchTeachers = () => {
// //     fetch(teacherApiUrl)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error('Network response was not ok');
// //             }
// //             return response.json();  // Parse JSON from the response
// //         })
// //         .then(data => {
// //             console.log("Teacher Data:", data);  // Log the fetched data
// //         })
// //         .catch(error => {
// //             console.error('Error fetching teacher data:', error);  // Log any errors
// //         });
// // };

// // // Function to fetch and display skill data
// // const fetchSkills = () => {
// //     fetch(skillApiUrl)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error('Network response was not ok');
// //             }
// //             return response.json();  // Parse JSON from the response
// //         })
// //         .then(data => {
// //             displaySkills(data);  // Call the function to display skills
// //         })
// //         .catch(error => {
// //             console.error('Error fetching skill data:', error);  // Log any errors
// //         });
// // };

// // // Function to fetch and display course data
// // const fetchCourses = () => {
// //     fetch(courseApiUrl)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error('Network response was not ok');
// //             }
// //             return response.json();  
// //         })
// //         .then(data => {
// //             displayCourses(data);  // Call the function to display courses
// //         })
// //         .catch(error => {
// //             console.error('Error fetching course data:', error);  // Log any errors
// //         });
// // };










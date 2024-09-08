// const baseUrl = "http://127.0.0.1:8000";
// // const baseUrl = "https://online-school-1wkk.onrender.com";


















const studentApiUrl = `${baseUrl}/accounts/student_list/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
const skillApiUrl = `${baseUrl}/skill/skills/`;
const courseApiUrl = `${baseUrl}/skill/courses/list/`;

// Function to fetch and display student data
const fetchStudents = () => {
    fetch(studentApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse JSON from the response
        })
        .then(data => {
            console.log("Student Data:", data);  // Log the fetched data
        })
        .catch(error => {
            console.error('Error fetching student data:', error);  // Log any errors
        });
};

// Function to fetch and display teacher data
const fetchTeachers = () => {
    fetch(teacherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse JSON from the response
        })
        .then(data => {
            console.log("Teacher Data:", data);  // Log the fetched data
        })
        .catch(error => {
            console.error('Error fetching teacher data:', error);  // Log any errors
        });
};

// Function to fetch and display skill data
const fetchSkills = () => {
    fetch(skillApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse JSON from the response
        })
        .then(data => {
            displaySkills(data);  // Call the function to display skills
        })
        .catch(error => {
            console.error('Error fetching skill data:', error);  // Log any errors
        });
};

// Function to fetch and display course data
const fetchCourses = () => {
    fetch(courseApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(data => {
            displayCourses(data);  // Call the function to display courses
        })
        .catch(error => {
            console.error('Error fetching course data:', error);  // Log any errors
        });
};

const display_detail = (pk_of_book) =>{
    const coursesContainer = document.getElementById('course_details');
    coursesContainer.innerHTML = ''; 
    coursesContainer.innerHTML= `
                <div class="card m-2 justify-spacearound" style="width: 18rem;">
                <img src="${course.thumbnail}" class="card-img-top" alt="Course Thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Skills: ${skills}</li>
            <li class="list-group-item">Taken By: ${course.taken_by.user.username}</li>
                    <li class="list-group-item">Rating: ${course.rating}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Course Details</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        `;
        coursesContainer.appendChild(courseElement);

    

}













// Function calls to fetch data
fetchStudents();
fetchTeachers();
fetchSkills();
fetchCourses();


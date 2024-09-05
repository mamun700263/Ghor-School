

// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "https://online-school-1wkk.onrender.com";
const studentApiUrl = `${baseUrl}/accounts/student_list/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
const skillApiUrl = `${baseUrl}/skill/skills/`;
const courseApiUrl = `${baseUrl}/skill/courses/list/`;

// Function to fetch student data
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

// Function to fetch teacher data
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

// Function to fetch skill data
const fetchSkills = () => {
    fetch(skillApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse JSON from the response
        })
        .then(data => {
            console.log("Skill Data:", data);  // Log the fetched data
        })
        .catch(error => {
            console.error('Error fetching skill data:', error);  // Log any errors
        });
};

// Function to fetch course data
const fetchCourses = () => {
    fetch(courseApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(data => {
            displayCourse(data);  // Log the fetched data
        })
        .catch(error => {
            console.error('Error fetching course data:', error);  // Log any errors
        });
};

//functions calling for confirmation
fetchStudents();
fetchTeachers();
fetchSkills();
fetchCourses();





const displayCourse = (courses) => {

    courses.forEach(element => {
        const parent = document.getElementById("ul");
        if (!parent) {
            console.error("Parent element not found!");
            return;
        }

        const li = document.createElement('li');
        const description = element.description.split(' ').slice(0, 10).join(' ') + '...';


        li.innerHTML = `
            <div class="card shadow h-50 w-75">
                <div class="ratio ratio-16x9">
                    <img src="${element.thumbnail}" class="card-img-top" loading="lazy" alt="Course Thumbnail">
                </div>
                <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${element.name}</h3>
                    <p class="card-text">${description}</p>
                    <div class="d-flex align-items-center" style="background-color: rgba(44, 130, 164, 0.01);">
                        <img src="${element.taken_by.profile_photo}" alt="Teacher Profile Photo" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                        <p class="card-text mb-0" style="background-color: rgba(44, 130, 164, 0.756);">${element.taken_by.account}</p> 
                    </div>
                    <a href="course_detail.html" class="btn btn-primary mt-3">Details</a>
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken');
    const navElement = document.getElementById("profile_login");
    console.log(authToken);

    if (authToken) {

        navElement.innerHTML = `
            <li class="nav-item mx-2">
                <a class="btn btn-success" href="profile.html">Profile</a>
            </li>
            <li class="nav-item mx-2">
                <a class="btn btn-primary" href="#" id="logout">Logout</a>
            </li>
        `;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('authToken'); 
            window.location.href = 'login.html'; 
        });
    } else {
        // User is not logged in
        navElement.innerHTML = `
            <li class="nav-item mx-2">
                <a class="btn btn-primary" href="login.html">Login</a>
            </li>
            <li class="nav-item mx-2">
                <a class="btn btn-success" href="registration.html">Sign Up</a>
            </li>
        `;
    }
});

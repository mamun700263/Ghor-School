// header section starts
document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
});
// header section ends

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
        console.log(element.thumbnail); // Check the URL in the console

        const parent = document.getElementById("ul");
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img src="${baseUrl}/${element.thumbnail}" class="card-img-top" loading="lazy" alt="...">
                </div>
                <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${element.name}</h3>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>
                    <a href="html/course_detail.html" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
}





// footer section starts
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});


// footer section ends
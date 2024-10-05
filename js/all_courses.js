const studentApiUrl = `${baseUrl}/accounts/student_list/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
const skillApiUrl = `${baseUrl}/skill/skills/`;
const courseApiUrl = `${baseUrl}/skill/courses/list/`;
let allCourses = []; // Store all courses for filtering later












// Function to display skills as buttons
const displaySkillsAsButtons = (skills) => {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = ''; // Clear previous content

    skills.forEach(skill => {
        const skillButton = document.createElement('button');
        skillButton.className = 'btn btn-primary m-2'; // Bootstrap button style
        skillButton.textContent = skill.name;
        skillButton.onclick = () => filterCoursesBySkill(skill.name); // Filter courses when clicked
        skillsContainer.appendChild(skillButton);
    });
};























// Function to display courses filtered by a selected skill
const filterCoursesBySkill = (skillName) => {
    const filteredCourses = allCourses.filter(course => {
        return course.skills_list.some(skill => skill.name === skillName); // Ensure the skill name matches
    });
    displayCourses(filteredCourses, skillName); // Pass skillName to display function
};

// Function to display courses
const displayCourses = (courses, skillName = "") => {
    console.log(courses);
    const headerContainer = document.getElementById('courses-container-header');
    headerContainer.innerHTML = ''; // Clear previous content

    // Display a message showing the number of courses or if no courses are available
    if (courses.length === 0) {
        headerContainer.innerHTML = `<p style="background-color: rgba(255, 0, 0, 0.2); padding: 10px; border-radius: 5px;">No courses available for <strong>${skillName}</strong>.</p>`;
    } else if(courses.length >=1 && skillName!=null) {
        headerContainer.innerHTML = `<p style="background-color: rgba(0, 255, 0, 0.2); padding: 10px; border-radius: 5px;">${courses.length} courses available  <strong>${skillName}</strong>.</p>`;
    }

    // Get the container for course cards
    const coursesCardContainer = document.getElementById('courses-container-cards');
    coursesCardContainer.innerHTML = ''; // Clear previous content

    // Loop through each course and display its details
    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'col'; // Bootstrap column class for grid layout
        console.log(course);

        const skills = course.skills_list.map(skill => skill.name).join(', ');
        const description = course.description.split(' ').slice(0, 10).join(' ') + '...';
        const courseCard = document.createElement("div");
            
        let price = course.price < 1 ? "Free" : `$${course.price}`; 
        let color = price === "Free"?  "#016208":"#004080";
        courseElement.innerHTML = `
            <a href="course_detail.html?id=${course.id}" class="card-link" style="text-decoration: none; color: inherit;">
                    <div class="card m-3 shadow-sm " style="width: 25rem; height: 30rem; border-radius: 10px;overflow: hidden;">
                        <img src="${course.thumbnail}" class="card-img-top" alt="${course.name}" style="width: 100%; height: 12rem; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                        <div class="card-body d-flex flex-column ">
                            <!-- Course name and duration with icon -->
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="card-title text-start" style="color: #004080; font-weight: bold; font-size:1.35rem;">
                                    ${course.name}
                                </h2>
                                <h4 class="d-flex align-items-center">
                                    <i class="fas fa-star me-1" style="color: #FFD700;"></i>
                                    <b class="text-center">${course.rating}⭐</b>
                                </h4>
                            </div>
                            <hr>
                            <p class="course-card-description" style="font-size:1rem;">${description}</p>
                            <!-- Course details, rating, and price with icons -->
                            <div class='d-flex justify-content-between align-items-center mt-auto'>
                                <small class="d-flex align-items-center my-2" style="font-size:1rem;">
                                    <i class="fas fa-clock me-1" style="color: #6c757d;"></i> <!-- Clock icon -->
                                    ${course.time} Hour
                                </small>
                                <h4 class="btn d-flex align-items-center" style="background-color:${color}; color: white;">
                                    <i class="fas fa-tag"></i> <!-- Tag icon for price -->
                                    ${price}
                                </h4>
                            </div>
                        </div>
                    </div>
                </a>
        `;
        coursesCardContainer.appendChild(courseElement);
    });
};

// Fetch skills and courses, and display them
const fetchSkillsAndCourses = () => {
    fetch(skillApiUrl)
        .then(response => response.json())
        .then(skills => {
            displaySkillsAsButtons(skills); // Display skills as buttons
            return fetch(courseApiUrl); // Fetch courses after displaying skills
        })
        .then(response => response.json())
        .then(courses => {
            allCourses = courses; // Store courses for filtering
            displayCourses(courses); // Initially display all courses
        })
        .catch(error => console.error('Error fetching data:', error));
};

// Call the function to fetch and display skills and courses
fetchSkillsAndCourses();

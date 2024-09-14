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
    } else {
        headerContainer.innerHTML = `<p style="background-color: rgba(0, 255, 0, 0.2); padding: 10px; border-radius: 5px;">${courses.length} courses available for <strong>${skillName}</strong>.</p>`;
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

        courseElement.innerHTML = `
            <div class="card h-100">
                <img src="${course.thumbnail}" class="card-img-top" alt="Course Thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Skills: ${skills}</li>
                    <li class="list-group-item">Taken By: ${course.taken_by_name}</li>
                    <li class="list-group-item">Rating: ${course.rating}</li>
                </ul>
                <div class="card-body">
                    <a href="course_detail.html?id=${course.id}" class="btn btn-primary mt-3">Details</a>
                </div>
            </div>
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

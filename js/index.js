// const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = "https://online-school-1wkk.onrender.com";

const studentApiUrl = `${baseUrl}/accounts/student_list/`;
const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
const skillApiUrl = `${baseUrl}/skill/skills/`;
const courseApiUrl = `${baseUrl}/skill/courses/list/`;
const reviewApiUrl = `${baseUrl}/review/reviews/`;

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
            displayTeachers(data); // Log the fetched data
            console.log('reacher',data);
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
            console.log("Skill Data:", data); 
            displaySkills(data); // Log the fetched data
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
            displayCourses(data);  // Log the fetched data
        })
        .catch(error => {
            console.error('Error fetching course data:', error);  // Log any errors
        });
};

// Function to fetch review data
const fetchReview = () => {
    fetch(reviewApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(data => {
            displayreview(data);  // Corrected function call
        })
        .catch(error => {
            console.error('Error fetching review data:', error);  // Corrected error message
        });
};

// Function calls for confirmation
fetchStudents();
fetchTeachers();
fetchSkills();
fetchCourses();
fetchReview();

const displaySkills = (skills) => {
    const parent = document.getElementById("skills");
    parent.innerHTML = ''; // Clear any existing content
    skills.forEach(skill => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="skill-item">
                <button class="skill-btn">${skill.name}</button>
            </div>
        `;
        parent.appendChild(li);
    });
};

const displayTeachers = (teachers) => {
    teachers.forEach(teacher => {
        const parent = document.getElementById("slider2");
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-1x1">
                    <img src="${teacher.profile_picture
}" class="card-img-top" loading="lazy" alt="${teacher.name}">
                </div>
                <div class="card-body d-flex flex-column flex-md-row">
                    <div class="flex-grow-1">
                        <strong>${teacher.user.first_name} ${teacher.user.last_name}</strong>
                        <p class="card-text">${teacher.unique_id}</p>
                    </div>
                    
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
}





// Function to display courses with rating >= 4
const displayCourses = (courses) => {
    const parent = document.getElementById("ul_courses");
    parent.innerHTML = '';  // Clear previous content
    
    courses.forEach(course => {
        if (course.rating >= 4) {  // Corrected syntax for the if statement
        
            const courseCard = document.createElement("div");
            
            let description = course.description.split(' ').slice(0, 12).join(' ') + '...';  
            let price = course.price < 1 ? "Free" : `$${course.price}`; 
            let color = price === "Free"?  "#016208":"#004080";
            courseCard.innerHTML = `
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
                                    <b class="text-center">${course.rating}</b>
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
            
            parent.appendChild(courseCard);
        }
    });
};


const displayreview = (reviews) => {
    const parent = document.getElementById("reviews-cards");

    if (!parent) {
        console.error("Parent element not found!");
        return;
    }

    // Clear the parent element before appending new reviews
    parent.innerHTML = '';

    reviews.forEach((review, index) => {
        console.log('review:', review);
        if (review.rating === 5) {
            // Create a new div element for each review and make sure it's a carousel item
            const div = document.createElement('div');
            div.classList.add("carousel-item");

            // Make the first item active
            if (index === 0) {
                div.classList.add("active");
            }

            // Use the dynamic content for profile picture and username
            const profilePicture = review.given_by_img || 'default_image.jpg'; // Fallback to a default image
            const username = review.given_by_name || 'Anonymous'; // Fallback to 'Anonymous' if username is missing
            const role = review.role || 'Student';
            const reviewTitle = review.course_name || 'Review Title';
            const rating = '⭐⭐⭐⭐⭐';

            const reviewText = review.text || 'No review text provided.';

            div.innerHTML = `
                <div class="card mx-auto text-center" style="width: 50%;">
                    <div class="card-header">
                        <img src="${profilePicture}" alt="Profile of ${username}" id="reviews-img-profile">
                        <div class="reviewer-info">
                            <h6>${username}</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title m-auto"><strong>${reviewTitle}</strong></h5>
                        <small class="rating">${rating}</small>
                        <p class="card-text mt-4">${reviewText}</p>
                    </div>
                </div>
            `;
            parent.appendChild(div);
        }
    }); // <-- Closing the forEach loop
};

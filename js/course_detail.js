

// const studentApiUrl = `${baseUrl}/accounts/student_list/`;
// const teacherApiUrl = `${baseUrl}/accounts/teacher_list/`;
// const skillApiUrl = `${baseUrl}/skill/skills/`;
// const courseApiUrl = `${baseUrl}/skill/courses/list/`;
const reviewApiUrl = `${baseUrl}/review/reviews/`;
const token = localStorage.getItem('authToken');





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
        console.log(course);
        document.getElementById('course').innerHTML = `
<div class="rounded shadow-sm p-4" id="course-detail">
    <!-- Course Thumbnail -->
    <div class="w-100 text-center mb-4" id="course-thumbnail">
        <img src="${course.thumbnail}" alt="Course Thumbnail" class="img-fluid rounded" />
    </div>

    <!-- Course Information -->
    <div class="course-info w-100">
        <!-- Course Name, Instructor, and Rating -->
        <h2 class="mb-4 d-flex align-items-center justify-content-between">
            ${course.name}
            <div class="instructor d-flex align-items-center">
                <img src="${course.taken_by_img}" alt="Instructor Image" class="instructor-image rounded-circle me-2" width="40" />
                <p class="mb-0 fw-bold">${course.taken_by_name}</p>
            </div>
        </h2>

        <!-- Course Rating and Comments Icon -->
        <div class="d-flex align-items-center mb-3">
            <span class=""><strong>Skills:</strong> ${course.rating} ⭐</span>
            <i class="fa-solid fa-comment ms-2" style="color: #004080;"></i>
        </div>

        <!-- Course Details (Time and Price) -->
        <div class="info-container justify-content-between align-items-center mb-3">
            <p><strong>Time:</strong> ${course.time} hours</p>
            <p class="fw-bold text-primary">
                <strong>Price: </strong> ${course.paid ? `$${course.price}` : 'Free'}
            </p>
        </div>

        <!-- Skills List -->
        <div class="skills-list mb-4">
            <strong>Skills:</strong>
            ${course.skills_list.map(skill => `<span class="badge bg-secondary me-1">${skill.name}</span>`).join('')}
        </div>

        <!-- Course Description -->
        <p class="text-muted">${course.description}</p>

        <!-- Enroll Button -->
        <div class="enroll-container text-center mt-4">
            <button class="btn btn-primary btn-lg" 
                    onclick="enrollCourse(${course.id})"
                    style="background-color: ${course.paid ? '#004085' : 'green'};">
                Enroll
            </button>
            <p id="enroll-message" class="mt-3"></p>
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
fetchReview();


const displayreview = (reviews) => {

        const parent = document.getElementById("reviews");
        if (!parent) {
            console.error("Parent element not found!");
            return;
        }

        // Clear the parent element before appending new reviews
        parent.innerHTML = '';

        reviews.forEach((review, index) => {

            // console.log('review:', review.course,courseId);
            let x = review.course;

            if (String(x) === String(courseId)) {
                console.log('hell',review);
                // Create a new div element for each review and make sure it's a carousel item

                const div = document.createElement('div');
                // Use the dynamic content for profile picture and username

                let profilePicture = review.given_by_img;
                if (!profilePicture || profilePicture.length < 10) {
                    profilePicture = default_img; 
                }
                const username = review.given_by_name || 'Anonymous'; 
                const role = review.role || 'Student';
                const reviewTitle = review.course_name || 'Review Title';
                const rating = review.rating;
                const reviewText = review.text || 'No review text provided.';
                div.innerHTML = `
                        <div class="card mx-auto" style="width: 65%;">
                        <div class="card-header">
                            <img src="${profilePicture}" alt="Profile of ${username}" id="reviews-img-profile">
                            <div class="reviewer-info">
                                <h6>${username}</h6>
                            </div>
                        </div>
                        <div class="card-body">
                            <small class="rating">${rating}⭐</small>
                            <p class="card-text mt-4">${reviewText}</p>
                        </div>
                    </div>
                `;
                parent.appendChild(div);
            }
        }); 
};





    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page refresh
    
        
        if (!token) {
            alert('You are not logged in. Please log in to submit a review.');

            return;  // Prevent submission if not logged in
        }

        const rating = document.getElementById('rating').value;
        const text = document.getElementById('review_text').value;
    
        const reviewData = {
            course: courseId,
            rating: rating,
            text: text,
        };
        console.log(reviewData);
    
        // Send data to DRF
        fetch(reviewApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        // .then(data => {
        //     if (data.id) {
        //         alert('Review submitted successfully!');
        //     } else {
        //         alert('Error: ' + (data.detail || data.error || 'Unable to submit review.'));
        //     }
        // })
        .catch(error => {
            console.error('Error submitting review:', error); 
            alert('Error submitting review.');
        });
    });
    
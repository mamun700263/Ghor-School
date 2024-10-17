

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
        let profilePicture = course.taken_by_img &&course.taken_by_img!== 'None' ? course.taken_by_img: "images/User-Profile-PNG-Clipart.png";
        document.getElementById('course').innerHTML = `
<div class="rounded shadow-sm p-4 " id="course-detail">
    <!-- Course Thumbnail -->
    <div class="w-100 text-center mb-4" id="course-thumbnail">
        <img src="${course.thumbnail}" alt="Course Thumbnail" class="img-fluid rounded" id="thumbnail-img" />
    </div>

    <!-- Course Information -->
    <div class="course-info w-100">
        <!-- Course Name, Instructor, and Rating -->
        <h2 class="mb-4 d-flex align-items-center justify-content-between">
            ${course.name}
            <div class="instructor d-flex align-items-center">
                <img src="${ course.taken_by_img}" alt="Instructor Image" class="instructor-image rounded-circle me-2" width="40" />
                <p class="mb-0 fw-bold">${course.taken_by_name}</p>
            </div>
        </h2>

        <!-- Course Rating and Comments Icon -->
        <div class="d-flex align-items-center mb-3">
            <span class=""><strong>Ratings:</strong> ${course.rating} ⭐</span>
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

        const parent = document.getElementById("reviews_course_details");
        if (!parent) {
            console.error("Parent element not found!");
            return;
        }
        // Clear the parent element before appending new reviews
        parent.innerHTML = '';

        reviews.forEach((review, index) => {
            console.log('review ',review);

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
                // Assume review.time is a valid date string or timestamp
                const time = new Date(review.time); // Convert the time into a Date object

                // Format the time in a human-readable format (e.g., 'October 12, 2024, 10:45 AM')
                const formattedTime = time.toLocaleString('en-US', {
                // weekday: 'short', // e.g., 'Mon'
                year: 'numeric',
                month: 'long', // e.g., 'October'
                day: 'numeric',
                // hour: 'numeric',
                // minute: 'numeric',
                // hour12: true // 12-hour format
                });


                div.innerHTML = `
                        <div class="card mx-auto my-5" style="width: 65%;">
                        <div class="card-header">
                            <img src="${profilePicture}" alt="Profile of ${username}" id="reviews-img-profile">
                            <div class="reviewer-info">
                                <h6>${username}</h6>
                            </div>
                        </div>
                        <div class="card-body">
                        <div class="d-flex">
                        
                            <small class="rating text-start">${rating}⭐</small>
                            <p class="text-end ms-auto">${formattedTime}</p>
                        </div> 
                            <p class="card-text text-start my-1">${reviewText}</p>
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
        displayMessage('You are not logged in. Please log in to submit a review.', 'error');
        return;  // Prevent submission if not logged in
    }

    const rating = document.getElementById('rating').value;
    const text = document.getElementById('review_text').value;

    const reviewData = {
        course: courseId,
        rating: rating,
        text: text,
    };

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
        return response.json().then(data => {
            if (!response.ok) {
                throw data; // Pass the error message data to the catch block
            }
            return data;
        });
    })
    .then(data => {
        if (data.message) {
            // Display success message
            displayMessage('Review submitted successfully!', 'success');
            location.reload();
            // Create new review element and append to the review list
            const newReview = `
                <div class="card mx-auto my-5" style="width: 50%;">
                    <div class="card-header bg-success text-center">
                        <img src="${data.given_by_img || 'images/User-Profile-PNG-Clipart.png'}" alt="Profile of ${data.given_by_name || 'Anonymous'}" id="reviews-img-profile" class="rounded-circle" style="width: 80px; height: 80px;">
                        <div class="reviewer-info mt-2">
                            <h6>${data.given_by_name || 'Anonymous'}</h6>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <p class="card-title"><strong>${data.course_name || 'Review Title'}</strong></p>
                        <small class="rating">${data.rating} ⭐</small>
                        <p class="card-text mt-3">${data.text}</p>
                    </div>
                </div>
            `;

            // Append the new review to the parent container
            const reviewList = document.getElementById('review-list');
            reviewList.insertAdjacentHTML('afterbegin', newReview); // Adds the new review to the top of the list

            // Clear the review form
            document.getElementById('rating').value = '';
            document.getElementById('review_text').value = '';
        }
    })
    .catch(error => {
        // Display the error message from DRF response
        if (error.error) {
            displayMessage(error.error, 'error'); // Pass the error message to displayMessage function
            console.log(error);
        } 
        // else {
        //     displayMessage('An unexpected error occurred.', 'error');
        // }
        console.error('hrere',error);

    });
});

/**
 * Function to display success or error messages on the frontend
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function displayMessage(message, type) {
    const messageElement = document.getElementById('enroll-message-review');
    messageElement.innerText = message;
    messageElement.style.display = 'block'; // Ensure the element is visible
    if (type === 'success') {
        messageElement.style.color = 'green';
    } else if (type === 'error') {
        messageElement.style.color = 'red';
    }

    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

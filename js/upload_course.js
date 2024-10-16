
const skillsApiUrl = `${baseUrl}/skill/skills/`;
const courseApiUrl = `${baseUrl}/skill/courses/`;
document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('course-upload-form');
    const paidInput = document.getElementById('paid-input');
    const priceSection = document.getElementById('price-section');
    const skillsContainer = document.getElementById('skills-checkboxes');
    let profileId = null;

    // Fetch skills from API and populate the checkboxes
    try {
        const response = await fetch(skillsApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch skills.');
        }
        const data = await response.json();
        data.forEach(skill => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `skill-${skill.id}`;
            checkbox.name = 'skills';
            checkbox.value = skill.id;
            checkbox.classList="mx-3"

            const label = document.createElement('label');
            label.htmlFor = `skill-${skill.id}`;
            label.textContent = skill.name;

            // Append checkbox and label to the container
            skillsContainer.appendChild(checkbox);
            skillsContainer.appendChild(label);
            skillsContainer.appendChild(document.createElement('br'));  // New line
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        document.getElementById('upload-message').innerText = 'Failed to load skills.';
    }

    // Toggle price input visibility based on paid selection
    paidInput.addEventListener('change', () => {
        priceSection.style.display = paidInput.value === 'true' ? 'block' : 'none';
    });

    // Fetch profile data and store profileId
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            const response = await fetch(profileApiUrl, {
                headers: {
                    'Authorization': `Token ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            profileId = data.id;
            console.log('Profile ID:', data.id);

        } catch (error) {
            console.error('Error fetching profile data:', error);
            document.getElementById('upload-message').innerText = 'Failed to load profile data.';
        }
    } else {
        document.getElementById('upload-message').innerText = 'You need to be logged in to upload a course.';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('authToken');
        if (!token) {
            document.getElementById('upload-message').innerText = 'You need to be logged in to upload a course.';
            return;
        }
    
        const formData = new FormData(form);
        const file = formData.get('thumbnail');
    
        // Upload image to imgbb
        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
        const imgbbFormData = new FormData();
        imgbbFormData.append('image', file);
    
        let imageUrl = '';
    
        try {
            const imgbbResponse = await fetch(imgbbUrl, {
                method: 'POST',
                body: imgbbFormData
            });
            const imgbbData = await imgbbResponse.json();
            if (!imgbbResponse.ok) {
                throw new Error(imgbbData.error.message || 'Failed to upload image.');
            }
            imageUrl = imgbbData.data.url;
        } catch (error) {
            console.error('Image upload failed:', error);
            document.getElementById('upload-message').innerText = 'Image upload failed. Please try again.';
            return;
        }
    
        // Gather selected skills (checkboxes)
        const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
            .map(checkbox => parseInt(checkbox.value));
    
        const courseData = {
            name: formData.get('name'),
            description: formData.get('description'),
            taken_by: 1, // Replace with a valid ID
            thumbnail: imageUrl,
            paid: formData.get('paid') === 'true',
            price: formData.get('price') || null,
            time: formData.get('time'),
            skills: selectedSkills
        };
    
        console.log('Course Data:', JSON.stringify(courseData, null, 2)); // Log the data being sent
    
        try {
            const response = await fetch(courseApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });
        
            if (!response.ok) {
                const responseData = await response.json();
                console.error('API response:', responseData); // Log the response data
                throw new Error(responseData.detail || 'Failed to upload course.');
            }
        
            document.getElementById('upload-message').innerText = 'Course uploaded successfully!';
            form.reset();
            window.location.href = '/profile.html';
        } catch (error) {
            console.error('Course upload failed:', error);
            document.getElementById('upload-message').innerText = 'Course upload failed. Please try again.';
        }
    });
});

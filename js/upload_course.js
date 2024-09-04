
// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "https://online-school-1wkk.onrender.com";
const imgbbApiKey = "YOUR_IMGBB_API_KEY"; 
const courseApiUrl =`${baseUrl}/skill/courses/`;
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('course-upload-form');
    const paidInput = document.getElementById('paid-input');
    const priceSection = document.getElementById('price-section');

    // Toggle price input visibility based on paid selection
    paidInput.addEventListener('change', () => {
        priceSection.style.display = paidInput.value === 'true' ? 'block' : 'none';
    });

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

        // Prepare data for API submission
        const courseData = {
            name: formData.get('name'),
            taken_by: formData.get('teachers').split(',').map(id => id.trim()),
            thumbnail: imageUrl,
            paid: formData.get('paid') === 'true',
            price: formData.get('price') || null,
            time: formData.get('time')
        };

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
                throw new Error(responseData.detail || 'Failed to upload course.');
            }

            document.getElementById('upload-message').innerText = 'Course uploaded successfully!';
            form.reset();
        } catch (error) {
            console.error('Course upload failed:', error);
            document.getElementById('upload-message').innerText = 'Course upload failed. Please try again.';
        }
    });
});

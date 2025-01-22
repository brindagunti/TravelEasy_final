
// document.getElementById('addCardBtn').addEventListener('click', async () => {
//     const description = document.getElementById('card-description').value;
//     const imageFile = document.getElementById('card-image').files[0];
//     const user_id = 1;

//     console.log('Description:', description);
//     console.log('ImageFile:', imageFile);
//     console.log('User ID:', user_id);

//     if (!imageFile) {
//         console.error('No image selected.');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('image', imageFile);
//     formData.append('user_id', user_id);  

//     try {
//         const response = await fetch('http://localhost:3000/api/blogs', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const blog = await response.json();
//             console.log('New blog added:', blog);
//             addCardToPage(blog);
//         } else {
//             console.error('Error adding the blog:', await response.text());
//         }
//     } catch (error) {
//         console.error('Network error:', error);
//     }
// });


document.getElementById('addCardBtn').addEventListener('click', async () => {
    const description = document.getElementById('card-description').value;
    const imageFile = document.getElementById('card-image').files[0];
    const token = localStorage.getItem('token'); // Retrieve token

    console.log('Stored Token:', token); // Debugging stored token

    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = './signIn/signin,html';
        return;
    }

    if (!imageFile) {
        console.error('No image selected.');
        alert('Please select an image before adding a blog.');
        return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in headers
            },
            body: formData,
        });

        if (response.ok) {
            const blog = await response.json();
            console.log('New blog added:', blog);
            addCardToPage(blog);
            alert('Blog added successfully!');
        } else if (response.status === 401) {
            console.error('Unauthorized: Invalid token.');
            alert('Session expired. Please log in again.');
            window.location.href = '/login.html'; // Redirect to login
        } else {
            const errorMessage = await response.text();
            console.error('Error adding the blog:', errorMessage);
            alert('Error adding the blog. Please try again.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your connection and try again.');
    }
});

async function fetchBlogs() {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token); // Debugging stored token

    if (!token) {
        console.error('No token found. Please log in.');
        alert('Session expired. Please log in again.');
        window.location.href = '/login.html'; // Redirect to login page
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to headers
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const blogs = await response.json();
            console.log('Fetched blogs:', blogs); // Debug fetched blogs
            displayBlogs(blogs); // Function to render blogs on the page
        } else if (response.status === 401) {
            console.error('Unauthorized: Invalid token.');
            alert('Session expired. Please log in again.');
            window.location.href = '/login.html'; // Redirect to login
        } else {
            const errorMessage = await response.text();
            console.error('Error fetching blogs:', errorMessage);
            alert('Error fetching blogs. Please try again.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your connection and try again.');
    }
}

function displayBlogs(blogs) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear existing cards

    blogs.forEach((blog) => {
        addCardToPage(blog);
    });
}

function addCardToPage(blog) {
    const cardContainer = document.getElementById('card-container');
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    const createdDate = new Date(blog.created_at);
    const formattedDate = createdDate.toLocaleString();

    card.innerHTML = `
        <div class="card">
            <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
            <div class="card-body">
                <p class="card-text"><strong>Description:</strong> ${blog.description}</p>
                <p class="card-text"><strong>Posted by:</strong> ${blog.username}</p>
                <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);

    if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = '/login.html'; // Redirect to login
        return;
    }

    fetchBlogs(); // Fetch blogs on page load
});

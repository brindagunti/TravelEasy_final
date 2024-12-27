
document.getElementById('addCardBtn').addEventListener('click', async () => {
    const description = document.getElementById('card-description').value;
    const imageFile = document.getElementById('card-image').files[0];
    const user_id = 1;

    console.log('Description:', description);
    console.log('ImageFile:', imageFile);
    console.log('User ID:', user_id);

    if (!imageFile) {
        console.error('No image selected.');
        return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', imageFile);
    formData.append('user_id', user_id);  

    try {
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const blog = await response.json();
            console.log('New blog added:', blog);
            addCardToPage(blog);
        } else {
            console.error('Error adding the blog:', await response.text());
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});
async function fetchBlogs() {
    try {
        const response = await fetch('http://localhost:3000/api/blogs');
        if (response.ok) {
            const blogs = await response.json(); // Adjust if the backend nests results
            const blogListHTML = blogs.map((blog) => {
                const createdAt = new Date(blog.created_at || Date.now());
                const date = createdAt.toLocaleDateString();
                const time = createdAt.toLocaleTimeString();

                return `
                    <div class="blog-card col-md-4 mb-4">
                        <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
                        <div class="card-body">
                            <p>${blog.description}</p>
                            <p><strong>Posted by:</strong> ${blog.username || 'Unknown'}</p>
                            <p><strong>Date:</strong> ${date}</p>
                            <p><strong>Time:</strong> ${time}</p>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('blog-list').innerHTML = blogListHTML;
        } else {
            console.error('Error fetching blogs:', await response.text());
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}


document.addEventListener('DOMContentLoaded', fetchBlogs);

function addCardToPage(blog) {
    console.log('Blog Data:', blog); // Debugging line to inspect data

    const cardContainer = document.getElementById('card-container');
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    const createdAt = new Date(blog.created_at || Date.now()); // Fallback to current date if `created_at` is missing
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString();

    card.innerHTML = `
        <div class="card">
            <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
            <div class="card-body">
                <p class="card-text">${blog.description}</p>
                <p class="text-muted">Posted by: ${blog.username || 'Unknown'}</p>
                <p class="text-muted">On: ${date} at ${time}</p>
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
}


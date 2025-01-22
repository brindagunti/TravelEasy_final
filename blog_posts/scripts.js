
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
            const blogs = await response.json();
            console.log('Fetched Blogs:', blogs); // Debug
            const blogListHTML = blogs.map(blog => {
                const createdDate = new Date(blog.created_at);
                const formattedDate = createdDate.toLocaleString();

                return `
                    <div class="blog-card col-md-4 mb-4">
                        <div class="card">
                            <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
                            <div class="card-body">
                                <p class="card-text"><strong>Description:</strong> ${blog.description}</p>
                                <p class="card-text"><strong>Posted by:</strong> ${blog.username}</p>
                                <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            document.getElementById('blog-list').innerHTML = blogListHTML; // Populate the blog list
        } else {
            console.error('Error fetching blogs:', await response.text());
        }
    } catch (error) {
        console.error('Network error:', error);
    }
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
    fetchBlogs(); // Fetch blogs on page load
});


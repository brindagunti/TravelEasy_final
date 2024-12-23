
  
// document.getElementById('addCardBtn').addEventListener('click', async () => {
//     const description = document.getElementById('card-description').value;
//     const imageFile = document.getElementById('card-image').files[0];
//     const user_id = 1;

//     console.log('Description:', description);
//     console.log('ImageFile:', imageFile);
//     console.log('User ID:', user_id);

//     if (!imageFile) {
//       console.error('No image selected.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('image', imageFile);
//     formData.append('user_id', user_id);  

//     try {
//       const response = await fetch('http://localhost:3001/api/blogs', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const blog = await response.json();
//         console.log('New blog added:', blog);
//         addCardToPage(blog);
//       } else {
//         console.error('Error adding the blog:', await response.text());
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
// });
// async function fetchBlogs() {
//     try {
//       const response = await fetch('http://localhost:3001/api/blogs');
//       if (response.ok) {
//         const blogs = await response.json();
//         blogs.forEach(blog => addCardToPage(blog));
//       } else {
//         console.error('Error fetching blogs:', await response.text());
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   }
  
//   // Call fetchBlogs when the page loads
//   document.addEventListener('DOMContentLoaded', fetchBlogs);
  
//   function addCardToPage(blog) {
//     const cardContainer = document.getElementById('card-container');
//     const card = document.createElement('div');
//     card.classList.add('col-md-4', 'mb-4');
  
//     card.innerHTML = `
//       <div class="card">
//         <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" />
//         <div class="card-body">
//           <p class="card-text">${blog.description}</p>
//         </div>
//       </div>
//     `;
  
//     cardContainer.appendChild(card);
//   }
  
  
// Event listener for adding a new blog card
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
        const response = await fetch('http://localhost:3001/api/blogs', {
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

// Fetch existing blogs from the server
async function fetchBlogs() {
    try {
        const response = await fetch('http://localhost:3001/api/blogs');
        if (response.ok) {
            const blogs = await response.json();

            // Log the blog data to inspect image URLs
            console.log(blogs);

            // Generate HTML for each blog card
            const blogListHTML = blogs.map(blog => `
                <div class="blog-card">
                    <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
                    <p>${blog.description}</p>
                </div>
            `).join('');

            // Insert the generated HTML into the blog-list div
            document.getElementById('blog-list').innerHTML = blogListHTML;
        } else {
            console.error('Error fetching blogs:', await response.text());
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Call fetchBlogs when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogs);

// Function to add a blog card to the page
function addCardToPage(blog) {
    const cardContainer = document.getElementById('card-container');
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    card.innerHTML = `
      <div class="card">
        <img src="${blog.image_url}" class="card-img-top" alt="Blog Image" onerror="this.onerror=null; this.src='default-image.jpg';" />
        <div class="card-body">
          <p class="card-text">${blog.description}</p>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
}
  
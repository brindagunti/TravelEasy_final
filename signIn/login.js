
// async function handleSignup(event) {
//     event.preventDefault();
//     console.log('Sign Up button clicked');

//     const username = document.getElementById('signupUsername').value;
//     const email = document.getElementById('signupEmail').value;  // Get email
//     const password = document.getElementById('signupPassword').value;

//     console.log('Username:', username, 'Email:', email, 'Password:', password);

//     const response = await fetch('http://localhost:3000/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//     });

//     if (response.ok) {
//         const data = await response.json();
//         console.log('User created:', data);
//         alert('Sign-up successful! You can now log in.');
//         localStorage.setItem('username', username);
//         window.location.href = '/Home.html';
//     } else {
//         const errorData = await response.json();
//         alert(`Sign-up failed: ${errorData.message}`);
//     }
// }

// async function handleSignin(event) {
//     event.preventDefault(); 
//     console.log('Sign In button clicked'); 

//     const usernameOrEmail = document.getElementById('signinUsernameOrEmail').value; 
//     const password = document.getElementById('signinPassword').value; 

//     console.log('Username/Email:', usernameOrEmail, 'Password:', password); 

//     const response = await fetch('http://localhost:3000/signin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ usernameOrEmail, password }), 
//     });

//     if (response.ok) {
//         const data = await response.json();
//         console.log('User signed in:', data); 
//         alert('Sign-in successful!');
//         localStorage.setItem('username', data.username);
//         window.location.href = '/Home.html'; 
//     } else {
//         const errorData = await response.json();
//         alert(`Sign-in failed: ${errorData.message}`); 
//     }
// }

// Handle user sign-up

// Define the findUser function


async function handleSignup(event) {
    event.preventDefault();
    console.log('Sign Up button clicked');

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value; // Get email
    const password = document.getElementById('signupPassword').value;

    console.log('Username:', username, 'Email:', email, 'Password:', password);

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Use the correct variables here
    });
    
    if (response.ok) {
        const data = await response.json();
        console.log('User signed up:', data);
        alert('Sign-up successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        window.location.href = '/Home.html';
    } else {
        const errorData = await response.json().catch(() => ({ message: 'Invalid response from server' }));
        alert(`Sign-up failed: ${errorData.message}`);
    }
}



// Handle user sign-in
async function handleSignin(event) {
    event.preventDefault();
    console.log('Sign In button clicked');

    const usernameOrEmail = document.getElementById('signinUsernameOrEmail').value;
    const password = document.getElementById('signinPassword').value;

    console.log('Username/Email:', usernameOrEmail, 'Password:', password);

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameOrEmail, password }),
        });
        
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        
        if (response.ok) {
            const data = await response.json();
            console.log('User signed in:', data);
            alert('Sign-in successful!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            window.location.href = '/Home.html';
        } else {
            const errorData = await response.json();
            alert(`Sign-in failed: ${errorData.message}`);
        }
        
    } catch (err) {
        console.error('Error during sign-in:', err);
        alert('An error occurred. Please try again.');
    }
}


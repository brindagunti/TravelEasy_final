async function handleSignup(event) {
    event.preventDefault(); 
    console.log('Sign Up button clicked'); 

    const username = document.getElementById('signupUsername').value; 
    const password = document.getElementById('signupPassword').value; 

    console.log('Username:', username, 'Password:', password); 

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('User created:', data); 
        alert('Sign-up successful! You can now log in.'); 
        localStorage.setItem('username', username);
        window.location.href = '/Home.html'; 
    } else {
        const errorData = await response.json();
        alert(`Sign-up failed: ${errorData.message}`); 
    }
}


async function handleSignin(event) {
    event.preventDefault(); 

    const username = document.getElementById('signinUsername').value; 
    const password = document.getElementById('signinPassword').value; 

    const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Token:', data.token); 
        alert('Sign-in successful!'); 
        window.location.href = '/Home.html'; 
    } else {
        const errorData = await response.json();
        alert(`Sign-in failed: ${errorData.message}`); 
    }
}


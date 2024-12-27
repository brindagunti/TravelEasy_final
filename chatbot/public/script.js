// script.js

// Add event listener to the home button
document.getElementById('home-btn').addEventListener('click', () => {
    // Redirect to the home.html page
    window.location.href = '/Home.html'; // This will redirect to home.html
});


document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            chatInput.value = ''; // Clear the input field

            // Get bot response from the server
            const botResponse = await getBotResponse(userMessage);
            displayMessage(botResponse, 'bot');
        }
    });

    async function getBotResponse(message) {
        try {
            const response = await fetch('http://localhost:3000/chat', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.reply || 'Sorry, I didn’t understand that.';
        } catch (error) {
            console.error('Error fetching bot response:', error);
            return 'Oops! Something went wrong. Please try again.';
        }
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
    }
});

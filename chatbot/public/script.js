// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // Home button event listener with null check
    const homeButton = document.getElementById('home-btn');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = '/Home.html'; // Redirects to home.html
        });
    }

    // Chat functionalities
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');

    // Prevents error if elements are missing
    if (sendBtn && chatInput && chatMessages) {
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
    } else {
        console.error("Some chat elements were not found in the DOM.");
    }

    // Fetch bot response from server
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

    // Display message in chatbox
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
        // Render HTML content for bot responses
        if (sender === 'bot') {
            messageDiv.innerHTML = message;
        } else {
            messageDiv.textContent = message;
        }
    
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
    }
    
    
});

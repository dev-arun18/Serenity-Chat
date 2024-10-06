// JavaScript to manage the chat behavior



document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    sendMessage();
});

document.getElementById('message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent page reload on pressing Enter
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('message');
    const message = userInput.value.trim();

    if (message === '') return; // Exit if the message is empty

    // Append the user's message to the chatbox
    appendMessage('user', message, 'static/user-icon.png');
    userInput.value = ''; // Clear the input field

    // Send the user's message to the server
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then((response) => response.json())
    .then((data) => {
        // Append the bot's response to the chatbox
        appendMessage('bot', data.response, 'static/bot-icon.png');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function appendMessage(sender, message, iconSrc) {
    const chatbox = document.getElementById('chat-box');

    // Create a new message container
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);

    // Create the icon for the message
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = sender + ' icon';
    icon.classList.add('chat-icon');

    // Create the message text
    const messageText = document.createElement('p');
    messageText.innerText = message;

    // Append the icon and text to the message container
    messageDiv.appendChild(icon);
    messageDiv.appendChild(messageText);
    chatbox.appendChild(messageDiv);

    // Scroll the chatbox to the latest message
    chatbox.scrollTop = chatbox.scrollHeight;
}

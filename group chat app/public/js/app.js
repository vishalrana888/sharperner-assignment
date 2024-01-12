

function login() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value;

    // Store the username in cookies
    document.cookie = `username=${username}; path=/`;


    // Redirect to the home page
    window.location.href = '/';
}
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        credentials: 'same-origin',  // or 'include' if your client and server are on different domains
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        messageInput.value = '';
    });
}
function getMessages() {
    fetch('/get-messages')
        .then(response => response.json())
        .then(data => {
            console.log('Messages received:', data.messages);
            // const messagesContainer = document.getElementById('messagesContainer');

            // Clear previous messages
            // messagesContainer.innerHTML = '';

            // Display new messages
            // data.messages.forEach(message => {
            //     const messageElement = document.createElement('div');
            //     messageElement.textContent = message;
            //     messagesContainer.appendChild(messageElement);
            // });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

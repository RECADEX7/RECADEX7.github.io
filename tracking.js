function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.textContent = message;
        chatBody.insertBefore(messageDiv, document.querySelector('.message-input'));
        input.value = '';
    }
}

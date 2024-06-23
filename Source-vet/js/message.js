$(document).ready(function() {
    const chatBox = $('#chat-box');
    const messageInput = $('#message-input');
    const sendButton = $('#send-button');

    function addMessage(message, sender) {
        const messageElement = $('<div class="message"></div>').text(message);
        messageElement.addClass(sender);
        chatBox.append(messageElement);
        chatBox.scrollTop(chatBox[0].scrollHeight);
    }

    function addOptions(options) {
        options.forEach(option => {
            const optionButton = $('<button class="option-button"></button>').text(option.text);
            optionButton.click(function() {
                addMessage(option.text, 'customer');
                setTimeout(() => {
                    addMessage(option.response, 'vet');
                    if (option.nextOptions) {
                        addOptions(option.nextOptions);
                    }
                }, 1000);
            });
            chatBox.append(optionButton);
        });
        chatBox.scrollTop(chatBox[0].scrollHeight);
    }

    sendButton.click(function() {
        const message = messageInput.val();
        if (message.trim() !== '') {
            addMessage(message, 'customer');
            messageInput.val('');

            // Simulate veterinarian response with options after a short delay
            setTimeout(() => {
                addMessage("Thank you for your message. How can I help you?", 'vet');
                const options = [
                    { text: "Look for a Vet", response: "Sure, I can help you find a vet. Please provide your location.", nextOptions: null },
                    { text: "Suggestions for a Vet", response: "Here are some suggestions for veterinarians: Dr. Smith, Dr. Johnson, Dr. Lee.", nextOptions: null },
                    { text: "Ask about services", response: "We offer various services including vaccinations, check-ups, surgeries, and more. What service are you interested in?", nextOptions: null }
                ];
                addOptions(options);
            }, 1000);
        }
    });

    messageInput.keypress(function(e) {
        if (e.which === 13) {
            sendButton.click();
        }
    });
});

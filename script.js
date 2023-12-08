let user = 'Shahd ✨';

document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.querySelector('.chat-container');

  function createMessageElement(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', message.sender === user ? 'my-message' : 'friend-message');
    messageBox.innerHTML = `<p>${twemoji.parse(message.content)}<br><span>${message.timestamp}</span></p>`;
    return messageBox;
  }

  async function loadMessages() {
    try {
      // Read messages from the text file (replace 'messages.txt' with your actual file path)
      const response = await fetch('media/msgs.txt');
      const data = await response.text();
      const messages = parseMessages(data);
      
      messages.forEach(message => {
        const messageElement = createMessageElement(message);
        chatContainer.appendChild(messageElement);
      });
    } catch (error) {
      console.error('Error reading messages:', error);
    }
  }

  function parseMessages(data) {
    // Parse messages from the text file
    const lines = data.split('\n');
    const messages = [];

    lines.forEach(line => {
      const match = line.match(/(\d+\/\d+\/\d+, \d+:\d+\s[APMapm]+)\s-\s([^:]+):\s(.*)/);
      if (match) {
        const timestamp = match[1];
        const sender = match[2].trim();
        const content = match[3].trim();
        messages.push({ content, timestamp, sender });
      } else {
        messages[messages.length - 1].content += '<br>' + line;
      }
    });

    return messages;
  }

  loadMessages();
});

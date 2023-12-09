let user = 'Shahd ✨';
let isuser = true;
document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.querySelector('.chat-container');

  function createMessageElement(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', (isuser && (message.sender === user)) || (!isuser && (message.sender != user)) ? 'my-message' : 'friend-message');
    messageBox.innerHTML = `<p>${twemoji.parse(message.content)}<br><span>${message.timestamp}</span></p>`;
    return messageBox;
  }

  async function loadMessages(messages) {
    try {
      // Clear existing messages
      chatContainer.innerHTML = '';

      messages.forEach(message => {
        const messageElement = createMessageElement(message);
        chatContainer.appendChild(messageElement);
      });
    } catch (error) {
      console.error('Error reading messages:', error);
    }
  }

  function parseMessages(data,conf=1) {
    // Parse messages from the text file
    const lines = data.split('\n');
    const messages = [];
    if(conf){
    user = lines[0].match(/(\d+\/\d+\/\d+, \d+:\d+\s[APMapm]+)\s-\s([^:]+):\s(.*)/)[2].trim();
    const response = confirm(`Is this the moon (${user})? `);
    isuser = response;
    }
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
  async function fir(){
  try{
  const response = await fetch('msgs/msgs.txt');
  const text = await response.text();
  const messages = parseMessages(text,0);
  loadMessages(messages); // Initial load with empty messages
  }catch(error){

  }
}
fir();
  // Event listener for file input change
  document.getElementById("fileInput").addEventListener('change', async function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      try {
        const text = await file.text();
        const messages = parseMessages(text);
        loadMessages(messages);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  });

  // Event listener for button click to trigger file input click
  document.getElementById("addbutton").onclick = function () {
    document.getElementById("fileInput").click();
  };
});

import React, { useState } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || conversation.length >= 25) return;

    setConversation([...conversation, { text: inputMessage, type: 'user' }]);
    setInputMessage('');

    try {
      const response = await axios.post('/api/send-message', { message: inputMessage });
      setConversation([...conversation, { text: response.data.message, type: 'ai' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-app">
      <div className="conversation">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={conversation.length >= 25}
        />
        <button onClick={sendMessage} disabled={conversation.length >= 25}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;

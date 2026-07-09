import React, { useState } from 'react';
import './PortfolioAssistant.css'; // Styling ke liye

function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! Main Synthesis Assistant hoon. Portfolio, trades ya alpha intel ke baare mein kuch bhi poocho!' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      const response = await fetch("https://synthesis-backend.onrender.com/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Cookie/Token bhejne ke liye
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply || "Kuch gadbad ho gayi!" }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Server se connect nahi ho pa raha hai!" }]);
    }
  };

  return (
    <div className="assistant-container">
      {!isOpen && (
        <button className="assistant-toggle-btn" onClick={toggleChat}>
          💬 AI Assistant
        </button>
      )}

      {isOpen && (
        <div className="assistant-chat-box">
          <div className="assistant-header">
            <h4>Synthesis Alpha Bot</h4>
            <button onClick={toggleChat} className="close-btn">&times;</button>
          </div>
          <div className="assistant-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="assistant-input-form">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value) } 
              placeholder="Ask about your portfolio..." 
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PortfolioAssistant;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/messages", { text });
    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <div className="app-container">
      <h2 className="title">📨 Simple MERN Message Board</h2>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          className="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="submit-button" type="submit">Send</button>
      </form>
      <ul className="message-list">
        {messages.map((msg) => (
          <li className="message-item" key={msg._id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

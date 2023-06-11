// App.js
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://flask-react-socket.el.r.appspot.com";

function App() {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", data => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("message", input);
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Enter a message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>Server says: {response}</p>
    </div>
  );
}

export default App;

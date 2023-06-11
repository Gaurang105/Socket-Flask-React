// App.js
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://flask-socket.onrender.com/';

function App() {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null); // Add a socket state

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket); // Store the socket instance in the state

    newSocket.on('message', data => {
      setResponse(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', input); // Use the stored socket instance to send a message
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

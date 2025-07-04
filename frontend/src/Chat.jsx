import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:9000');

function Chat({userName,roomId}) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  
   useEffect(()=>{
    socket.emit("join-room",{roomId})
  },[]);

  useEffect(() => {
    socket.on("server-msg", (msg) => {
      setChat(prev => [...prev, msg]);
    });

    return () => {
      socket.off("server-msg");
    };
  }, []);

  const msgSent = () => {
    if (message.trim() !== '') {
      socket.emit("client-msg", {
        message:message,
        username:userName,
        roomId:roomId
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat App</h1>
      <div className="chat-box">
        {chat.map((msg, i) =>{ 
          const ismIne=msg.username===userName
           return (
          <p className={ismIne?"sent":"received"} key={i}>{msg.message}</p>
        )})}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && msgSent()}
        />
        <button onClick={msgSent}>Send</button>
      </div>
    </div>
  );
}

export default Chat;

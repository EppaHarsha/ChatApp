import React, { useState } from 'react';
import './App.css';
import Chat from './Chat';
function App() {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const[showChat,setShowChat]=useState(false);

  return (
    
    <div className="app-container">
      {!showChat ?(
        <>
        <h1 className='heading'>Chat App</h1>
      <input  className='input'
        type="text"
        placeholder="Enter username..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input className='input'
        type="text"
        placeholder="Enter room id..."
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button className='btn' onClick={() => setShowChat(true)}>Join</button>
        </>
      ):(
      <Chat userName={userName} roomId={roomId}/>
      )}
      
    </div>
  );
}

export default App;

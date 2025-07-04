const express = require('express');
const http = require('http');
const path = require('path');
const cors=require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection',(socket)=>{
  socket.on("join-room",({roomId})=>{
    socket.join(roomId);
    console.log(`${socket.id} joined room : ${roomId}`);
  })
  
  socket.on("client-msg",({message,username,roomId})=>{
    const data={message,username};
    io.to(roomId).emit("server-msg",data);
  })
})

server.listen(9000, () => {
  console.log(" Server running at http://localhost:9000");
});

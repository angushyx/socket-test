const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
var cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on('connection',(socket)=>{
  console.log(`User Connected:${socket.id}`)
})

server.listen(PORT, console.log(`Server has successfully Start at: ${PORT}`));

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const initSocket = require("./socket");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your React dev server
    methods: ["GET", "POST"],
  },
});

// Initialize socket logic
initSocket(io);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

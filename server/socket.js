const { v4: uuidv4 } = require("uuid");

// In-memory state
let rectangles = [];

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send current snapshot
    socket.emit("rectangles:init", rectangles);

    // Add rectangle
    socket.on("rectangle:add", (rect) => {
      const rectWithId = { ...rect, id: uuidv4() };
      rectangles.push(rectWithId);

      // broadcast to others
      socket.broadcast.emit("rectangle:added", rectWithId);
      // send back to sender
      socket.emit("rectangle:added", rectWithId);
    });

    // Move rectangle
    socket.on("rectangle:move", ({ id, x, y }) => {
      rectangles = rectangles.map((r) => (r.id === id ? { ...r, x, y } : r));
      socket.broadcast.emit("rectangle:moved", { id, x, y });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

module.exports = initSocket;

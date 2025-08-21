// src/hooks/useSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { useCanvasStore } from "../store/useCanvasStore";

// ---- Socket singleton (one connection for the whole app)
const socket: Socket = io("http://localhost:4000", {
  autoConnect: false,
});

// guard to ensure listeners are only attached once
let listenersAttached = false;

export const useSocket = () => {
  const { addRectangle, updateRectanglePosition, setRectangles } =
    useCanvasStore();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (!listenersAttached) {
      // New client receives the snapshot
      socket.on("rectangles:init", (rects) => {
        setRectangles(rects);
      });

      // New rectangle from server (including echo for sender, with server id)
      socket.on("rectangle:added", (rect) => {
        addRectangle(rect, true);
      });

      // Movement from other clients (sender does NOT receive this)
      socket.on("rectangle:moved", ({ id, x, y }) => {
        updateRectanglePosition(id, x, y);
      });

      listenersAttached = true;
    }

    return () => {
      // We keep socket alive for the app lifetime
      // socket.disconnect();
    };
  }, [addRectangle, updateRectanglePosition, setRectangles]);

  return {
    // Add: sender does not add locally first; wait for server echo -> single source of truth
    emitAddRectangle: (rect: {
      x: number;
      y: number;
      width: number;
      height: number;
      fill: string;
    }) => socket.emit("rectangle:add", rect),

    // Move: sender updates locally immediately; others receive broadcast
    emitMoveRectangle: (data: { id: string; x: number; y: number }) =>
      socket.emit("rectangle:move", data),

    isConnected: socket.connected,
  };
};

export type { Socket };

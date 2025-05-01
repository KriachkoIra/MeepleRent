import { createServer } from "http";
import { Server } from "socket.io";

let connectedUsers = new Map(); // Maps userId to socketId
let io;

export const setupSocket = (app) => {
  const server = createServer(app);

  // Create Socket.IO instance
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3001",
      credentials: true
    }
  });

  io.on('connection', (socket) => {

    // authenticate user
    socket.on('authenticate', (data) => {
      connectedUsers.set(data.userId, socket.id);
      socket.userId = data.userId;
    });

    // handle typing...
    socket.on('typing', (data) => {
      const { recipientId } = data;
      const recipientSocketId = connectedUsers.get(recipientId);

      if (recipientSocketId) {
        io.to(recipientSocketId).emit('user_typing', {
          senderId: socket.userId
        });
      }
    });

    socket.on('disconnect', () => {
      if (socket.userId) {
        connectedUsers.delete(socket.userId);
      }
    });
  });

  return server;
}

export const notifyRecepient = (recepientId, senderId, text, type) => {
  const recipientSocketId = connectedUsers.get(recepientId);

  if (recipientSocketId) {
    io.to(recipientSocketId).emit('new_message', {
      senderId,
      message: text,
      type,
      timestamp: new Date()
    });
  }
}

import { Server } from 'socket.io';

export let ioInstance: Server;

export const initializeSocket = (io: Server) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log(`Client connected [id=${socket.id}]`);
    socket.on('disconnect', () => {
      console.log(`Client disconnected [id=${socket.id}]`);
    });
  });
};

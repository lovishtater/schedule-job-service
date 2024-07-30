import { Server } from 'socket.io';
import { IJob } from './types/jobs';

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

export const notifyJobCompleted = (io: Server, job: IJob) => {
  io.emit('jobCompleted', job);
};

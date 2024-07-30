import express from 'express';
import jobRoutes from './routes/jobRouter';
import cluster from 'cluster';
import consoleStamp from 'console-stamp';
import http from 'http';
import { initializeSocket } from './socket';
import { Server } from 'socket.io';
import 'dotenv/config';

consoleStamp(console, { format: ':date(dd/mm/yyyy HH:MM:ss.l):label' });

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `*`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  console.log('\x1b[33m%s\x1b[0m', req.method + ' ' + req.url);
  if (Object.keys(req.body).length > 0) console.log(req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the image processing API service');
});

app.use('/api', jobRoutes);

initializeSocket(io);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

export default app;

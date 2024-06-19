// const { createServer } = require('http'); 
import { createServer } from 'http';
// const next = require('next'); 
import next from 'next';
// const { Server } = require('socket.io'); 
import { Server } from 'socket.io';
import { createChannel} from './src/lib/channel/channelReal.js';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'http://31.220.18.188';
const port = 4000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(async () => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  async function onConnection(socket){
    console.log('a user connected');
    await createChannel(io,socket)
  }
         
  io.on('connection', await onConnection);

  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

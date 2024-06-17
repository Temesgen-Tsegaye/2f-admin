const { createServer } = require('http'); 
const next = require('next'); 
const { Server } = require('socket.io'); 

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 4000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
console.log('new user connected');
    socket.on('disconnect', () => {
    });

    socket.on('channel', async (count) => {
      console.log('Count received', count);
      io.emit('channel', count);
    });
  });

  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

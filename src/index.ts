import express from 'express'
import cors from 'cors'
//import { Server } from 'socket.io';
import userRouter from './routes/user'
import experienciasRouter from './routes/experiencias'
import { run } from './database/mongo_conn'
import initializeSocket from './routes/chat';

const app = express()
app.use(express.json())
run();

app.use(cors());


const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recibido correctamente')
    res.send('pinged')
})

app.use('/user',userRouter)
app.use('/experiencias',experienciasRouter)

const server = app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})

initializeSocket(server);



















/* const io = new Server(server,  {


















  cors: {
    origin: "*"
  }});

const connectedUser = new Set(); */


/* io.on('connection', (socket) => {
  console.log('**********************************************************Connected successfully', socket.id);
  socket.join("some room");
  connectedUser.add(socket.id);
  //io.emit('connected-user', connectedUser.size);
  io.to("some room").emit('connected-user', connectedUser.size);
  socket.on('disconnect', () => {
    console.log('Disconnected successfully', socket.id);
    connectedUser.delete(socket.id);
    //io.emit('connected-user', connectedUser.size);
    io.to("some room").emit('connected-user', connectedUser.size);
  });

  socket.on('manual-disconnect', () => {
    console.log('Manual disconnect requested', socket.id);
    socket.disconnect();
  });

  socket.on('message', async (data) => {
    console.log(data);
    //socket.broadcast.emit('message-receive', data);
    socket.to("some room").emit('message-receive', data);
  });
}); */

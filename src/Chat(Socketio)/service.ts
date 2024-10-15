import { Server } from 'socket.io';
//import { IChat } from './model';
import Chat from './Schema';

const connectedUser = new Set();

const socketService = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('**********************************************************Connected successfully', socket.id);
        socket.join("some room");
        connectedUser.add(socket.id);
        //io.emit('connected-user', connectedUser.size);
        io.to("some room").emit('connected-user', connectedUser.size);
    
        socket.on('disconnect', () => {
          console.log('Disconnected successfully', socket.id);
          connectedUser.delete(socket.id);
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
    
        socket.on('sendMessage', async (data: { user: string; message: string }) => {
          const message = new Chat(data);
          await message.save(); // Guardar en la base de datos
    
          // Emitir el mensaje a todos los clientes en la sala
          io.to("some room").emit('message-receive', message);
        });
      });
};

export default socketService;
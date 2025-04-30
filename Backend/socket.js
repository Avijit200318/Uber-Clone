import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`client disconnected: ${socket.id}`);
        })
    });
}

export const sendMessageToSocketId = (socketId, message) => {
    if(io){
        io.to(socketId).emit('message', message);
    }else{
        console.log('Socket.io not initialize.');
    }
}

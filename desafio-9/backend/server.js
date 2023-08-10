const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('Usuario conectado');

  // Escucha eventos desde el cliente
  socket.on('mensaje', mensaje => {
    console.log('Mensaje recibido:', mensaje);
    // Enviar el mensaje a todos los clientes conectados
    io.emit('mensaje', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

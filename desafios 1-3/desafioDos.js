import http from 'http'

const port = 3000;

// Función para responder con el array de productos mock
const handleRequest = (request, response) => {
  if (request.url === '/productos' && request.method === 'GET') {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', precio: 10.99 },
      { id: 2, nombre: 'Producto 2', precio: 24.99 },
      { id: 3, nombre: 'Producto 3', precio: 7.50 },
      // Agrega más objetos de productos mock aquí si lo deseas
    ];

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(productosMock));
  } else {
    // Ruta no válida
    response.statusCode = 404;
    response.end('Ruta no encontrada');
  }
};

// Crear el servidor HTTP
const server = http.createServer(handleRequest);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
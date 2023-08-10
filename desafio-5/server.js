const express = require('express');
const app = express();
const hbs = require('hbs')
const port = 3000;

app.set('view engine', 'hbs');

// Ruta para obtener el array de productos mock
app.get('/', (req,res) => {
  res.render('inicio', {
    tituloUno: 'Inicio',
    parrafo: 'Bienvenidos a mi Eccommerce'
  })
})

app.get('/productos', (req, res) => {
  const productosMock = [
    { id: 1, nombre: 'Producto 1', precio: 10.99 },
    { id: 2, nombre: 'Producto 2', precio: 24.99 },
    { id: 3, nombre: 'Producto 3', precio: 7.50 },
    // Agrega más objetos de productos mock aquí si lo deseas
  ];

  res.json(productosMock);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar Handlebars como motor de plantillas
app.set('view engine', 'hbs');

// Configurar body-parser para leer datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: false }));

// Array para almacenar los productos tipo mock
let productosMock = [];

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
  res.render('formulario');
});

// Ruta para manejar el envío del formulario
app.post('/guardar-producto', (req, res) => {
  const { nombre, precio } = req.body;

  // Crear el objeto del producto
  const producto = {
    nombre,
    precio: parseFloat(precio), // Convertir el precio a número
  };

  // Agregar el producto al array de productos mock
  productosMock.push(producto);

  res.redirect('/'); // Redirigir al formulario después de guardar el producto
});

// Ruta para mostrar los productos guardados
app.get('/productos', (req, res) => {
  res.render('productos', { productos: productosMock });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
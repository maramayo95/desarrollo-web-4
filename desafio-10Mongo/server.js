const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripción: String
});

const Producto = mongoose.model('Producto', productoSchema);

app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

app.post('/productos', async (req, res) => {
    try {
      const { nombre, precio, descripcion } = req.body;
      const nuevoProducto = new Producto({ nombre, precio, descripcion });
      await nuevoProducto.save();
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).send('Error al agregar producto');
    }
  });

  app.put('/productos/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { nombre, precio, descripcion } = req.body;
      const productoActualizado = await Producto.findByIdAndUpdate(
        productId,
        { nombre, precio, descripcion },
        { new: true }
      );
      res.json(productoActualizado);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).send('Error al actualizar producto');
    }
  });
  
  app.delete('/productos/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      await Producto.findByIdAndRemove(productId);
      res.send('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).send('Error al eliminar producto');
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

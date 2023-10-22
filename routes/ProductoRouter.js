const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');

router.post('/', ProductoController.crearProducto);
router.get('/', ProductoController.obtenerProductos);
router.get('/:id', ProductoController.obtenerProductoPorId);
router.put('/:id', ProductoController.actualizarProducto);
router.delete('/:id', ProductoController.eliminarProducto);

module.exports = router;

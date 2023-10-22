const ProductoDAO = require('../dataAccess/ProductoDAO');
const { AppError } = require('../utils/appError');

class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const { nombre, precio, cantidad } = req.body;
            if (!nombre || !precio || !cantidad) {
                next(new AppError('Los campos nombre, precio y cantidad son obligatorios'), 500);
            }

            const productoData = { nombre, precio, cantidad };

            const producto = await ProductoDAO.crearProducto(productoData);
            res.status(201).json(producto);

        } catch (error) {
            next(new AppError('Error al crear producto ', 500));
        }
    }

    static async obtenerProductoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const producto = await ProductoDAO.obtenerProductoPorId(id);

            if (!producto) {
                next(new AppError('No se encontró el producto ', 404));
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new AppError('No se logró obtener el producto ', 404));
        }
    }

    static async obtenerProductos(req, res, next) {
        try {
            const limit = req.params.limit || 10;

            const productos = await ProductoDAO.obtenerProductos(limit);

            res.status(200).json(productos);
        } catch (error) {
            next(new AppError('No se logró obtener los productos ', 404));
        }
    }

    static async actualizarProducto(req, res, next) {
        try {
            const id = req.params.id;
            const productoData = req.body;

            const producto = await ProductoDAO.actualizarProducto(id, productoData);

            if (!producto) {
                next(new AppError('No se encontró el producto ', 404));
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new AppError('No se pudo actualizar el producto ', 404));
        }
    }

    static async eliminarProducto(req, res, next) {
        try {
            const id = req.params.id;

            const producto = await ProductoDAO.eliminarProducto(id);

            if (!producto) {
                next(new AppError('No se encontró el producto ', 404));
            }

            res.status(200).json({ message: 'Producto eliminado corectamente' });
        } catch (error) {
            next(new AppError('No se pudo eliminar el producto ', 404));
        }
    }
}

module.exports = ProductoController;
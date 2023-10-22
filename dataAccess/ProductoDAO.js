const Producto = require('../models/Producto');

class ProductoDAO {
  static async crearProducto(productoData) {
    try {
      const producto = new Producto(productoData);
      return await producto.save();
    } catch (error) {
      return error;
    }
  }

  static async obtenerProductoPorId(id) {
    try {
      return await Producto.findById(id);
    } catch (error) {
      return error;
    }
  }

  static async actualizarProducto(id, productoData) {
    try {
      return await Producto.findByIdAndUpdate(id, productoData, { new: true });
    } catch (error) {
      return error;
    }
  }

  static async eliminarProducto(id) {
    try {
      return await Producto.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  static async obtenerProductos(limit = 10) {
    try {
      return await Producto.find().limit(limit);
    } catch (error) {
      return error;
    }
  }

}

module.exports = ProductoDAO;
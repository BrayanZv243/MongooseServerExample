const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const mongoose = require('mongoose');

class VentaDAO {
  static async crearVenta(ventaData) {
    try {
      const venta = new Venta(ventaData);
      return await venta.save();
    } catch (error) {
      return error;
    }
  }

  static async obtenerVentaPorId(id) {
    try {
      return await Venta.findById(id);
    } catch (error) {
      return error;
    }
  }

  static async obtenerVentas() {
    try {
      return await Venta.find();
    } catch (error) {
      return error;
    }
  }

  static async actualizarVenta(id, ventaData) {
    try {
      return await Venta.findByIdAndUpdate(id, ventaData, { new: true });
    } catch (error) {
      return error;
    }
  }

  static async eliminarVenta(id) {
    try {
      return await Venta.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  static async agregarProductosAVenta(idVenta, productos) {
    try {
      const venta = await Venta.findById(idVenta);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }
  
      // Iterar a través de los productos y agregarlos al campo 'productos' de la venta
      for (const productoVentaData of productos) {
        const nuevoProducto = {
          producto: productoVentaData.idproducto,
          cantidad: productoVentaData.cantidadVendida,
          subtotal: productoVentaData.subtotal,
          precioVenta: productoVentaData.precioVenta,
        };
        venta.productos.push(nuevoProducto);
      }
  
      // Guardar la venta actualizada
      return await venta.save();
    } catch (error) {
      throw error;
    }
  }

  static async obtenerDesgloseVenta(idVenta) {
    try {
      // Buscar la venta por ID
      const venta = await Venta.findById(idVenta);
  
      // Verificar si la venta existe
      if (!venta) {
        throw new Error('Venta no encontrada');
      }
  
      // Obtener los detalles de cada productoVenta
      const desgloseVenta = await Promise.all(venta.productos.map(async (productoVenta) => {
        // Buscar el producto correspondiente por su ID
        const producto = await Producto.findById(productoVenta.producto);
  
        // Crear un objeto con los detalles del productoVenta
        return {
          producto: producto,               // El documento del producto
          cantidadVendida: productoVenta.cantidadVendida, // Cantidad vendida de este producto
          subtotal: productoVenta.subtotal,  // Subtotal de este producto en la venta
          precioVenta: productoVenta.precioVenta, // Precio de venta de este producto
        };
      }));
  
      // Devolver un objeto que contiene la venta y su desglose
      return {
        venta: venta,          // El documento de la venta
        desglose: desgloseVenta,  // Un arreglo con los detalles de productosVenta
      };
    } catch (error) {
      // Manejar cualquier error y propagarlo
      return error;
    }
  }

  static async obtenerTodasLasVentasConDesglose() {
    try {
      // Buscar todas las ventas en la base de datos
      const ventas = await Venta.find();

      // Recopilar detalles de productos para cada venta
      const ventasConDesglose = await Promise.all(ventas.map(async (venta) => {
        // Obtener la lista de productosVenta de la venta actual
        const productosVenta = await venta.productoventa;

        // Obtener los detalles de cada productoVenta
        const desgloseVenta = productosVenta.map(async (productoVenta) => {
          // Buscar el producto correspondiente por su ID
          const producto = Producto.findById(productoVenta.idproducto);

          // Crear un objeto con los detalles del productoVenta
          return {
            producto: producto,                // El documento del producto
            cantidadVendida: productoVenta.cantidadVendida, // Cantidad vendida de este producto
            subtotal: productoVenta.subtotal,    // Subtotal de este producto en la venta
            precioVenta: productoVenta.precioVenta, // Precio de venta de este producto
          };
        });

        // Devolver un objeto que contiene la venta y su desglose
        return {
          venta: venta,          // El documento de la venta
          productoventa: productosVenta, // No es necesario convertirlo a JSON
          desglose: desgloseVenta, // Un arreglo con los detalles de productosVenta
        };
      }));

      return ventasConDesglose;
    } catch (error) {
      // Manejar cualquier error y propagarlo
      return error;
    }
  }
}

module.exports = VentaDAO;
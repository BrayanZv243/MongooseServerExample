const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  iva: {
    type: Number,
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
      precioVenta: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Venta', ventaSchema);
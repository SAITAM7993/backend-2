import mongoose from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product', //recontra importante, va en singular ya que es UN producto
        }, //con esto hacemos que se carge el producto entero  con la referencia del producto
        quantity: Number,
      },
    ],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

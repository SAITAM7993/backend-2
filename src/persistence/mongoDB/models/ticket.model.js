import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
  purchaser: { type: String, required: true },
  purchase_datatime: { type: Date, default: Date.now() },
  total_amount: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product', //importante, va en singular ya que es UN producto
        }, //con esto hacemos que se carge el producto entero  con la referencia del producto
        quantity: Number,
      },
    ],
  },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

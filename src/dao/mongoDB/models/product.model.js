import mongoose from 'mongoose';

const productCollection = 'products'; //por defecto le agrega una s para que sea plural si no se la agregamos

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: Array,
    default: [],
  },
  code: String,
  stock: Number,
  category: String,
  status: {
    type: Boolean,
    default: true,
  },
});

export const productModel = mongoose.model(productCollection, productSchema);

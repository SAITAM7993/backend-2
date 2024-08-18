import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; //importante instalado mediante npm install mongoose-paginate-v2

const productCollection = 'product'; //por defecto le agrega una s para que sea plural si no se la agregamos

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

productSchema.plugin(mongoosePaginate); //agregamos el plugin mongoose paginate sino no funciona, cuando consultemos los prod nos devuelve todo paginado

export const productModel = mongoose.model(productCollection, productSchema);

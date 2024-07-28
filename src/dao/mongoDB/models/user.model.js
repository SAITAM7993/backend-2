import mongoose from 'mongoose';

const userCollection = 'user';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, //sino mongo rompe cuando usamos autentificacion por google
  },
  email: {
    type: String,
    required: true, //con required validamos que se ingrese
    unique: true, //con esto validamos que el mail sea unico
  },
  age: {
    type: Number,
    required: false, //sino mongo rompe cuando usamos autentificacion por google
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'cart' }, //por defecto le crea un carrito y lo asocia al user
});
//hago un populate del cart con los productos
userSchema.pre('findOne', function () {
  this.populate('cart');
});
export const userModel = mongoose.model(userCollection, userSchema);
//ver si aplicar la logica de required y unique a product y cart

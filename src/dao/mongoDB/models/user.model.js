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
    required: true,
  },
  email: {
    type: String,
    required: true, //con required validamos que se ingrese
    unique: true, //con esto validamos que el mail sea unico
  },
  age: {
    type: Number,
    required: true,
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
//ver si aplicar la logica de required y unique a product y cart

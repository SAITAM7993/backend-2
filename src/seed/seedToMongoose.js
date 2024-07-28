//con este js me conecto a la base e inserto los productos
import mongoose from 'mongoose';
import envs from './envs.config.js';
import { seedProductsToDB } from './seedProduct.js';

dotenv.config();
const environment = async () => {
  await mongoose.connect(envs.MONGO_URL);
  seedProductsToDB(); //esto ejecuta la funcion que cree en seed/seedProduct.js
};

environment();

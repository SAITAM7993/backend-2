//con este js me conecto a la base e inserto los productos
import mongoose from 'mongoose';
import { seedProductsToDB } from './seedProduct.js';
import * as dotenv from 'dotenv'; //importo .env
dotenv.config();
const environment = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}`
  );
  seedProductsToDB(); //esto ejecuta la funcion que cree en seed/seedProduct.js
};

environment();

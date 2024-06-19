//este archivo tiene la configuracion de mongo, mongo atlas
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; //importo .env
dotenv.config();
export const connectMongoDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}`
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`Error: ${error}`); //simplifica el error
  }
};

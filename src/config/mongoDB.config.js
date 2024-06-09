//este archivo tiene la configuracion de mongo, mongo atlas
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.connect(
      'mongodb+srv://coder:BLkNKlhpUb7pgaBA@codercluster.ggiuopc.mongodb.net/entrega'
    ); //mongo
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`Error: ${error}`); //simplifica el error
  }
};

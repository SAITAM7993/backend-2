import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  PORT: process.env.PORT,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
};

//secret para estrategia de google, id para estrategia de google, secret para jjwt

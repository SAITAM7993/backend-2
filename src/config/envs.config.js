import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  PORT: process.env.PORT,
};

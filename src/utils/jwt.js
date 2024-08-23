import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js'; //traigo de envs el jwt secret code

//IMPORTANTE: No es buena practica que se envie el token por header

//creo token para usuario
export const createToken = (user) => {
  console.log(user);
  const { _id, email, role, cart } = user;
  const token = jwt.sign({ _id, email, role, cart }, envs.JWT_SECRET_CODE, {
    expiresIn: '10m',
  }); //le paso id de usuario, mail, rol y carrito, el token expira en 10 minutos

  return token;
};

//verifica si el token del usuario es correcto
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET_CODE); //codigo obtenido de env
    return decoded;
  } catch (error) {
    return null;
  }
};

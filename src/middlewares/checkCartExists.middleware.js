import { request, response } from 'express';
import cartRepository from '../persistence/mongoDB/cart.repository.js';
import isHexadecimal24Chars from './genericControls/checkHexadecimal.js';
export const checkCartExists = async (req = request, res = response, next) => {
  const { cid } = req.params;
  console.log(isHexadecimal24Chars(cid));
  if (!isHexadecimal24Chars(cid)) {
    return res.status(404).json({
      status: 'error',
      msg: `el dato ingresado debe ser un hexadecimal de 24 caracteres válido`,
    });
  }
  const cartExists = await cartRepository.getById(cid);
  if (!cartExists)
    return res.status(404).json({
      status: 'error',
      msg: `el carrito con el codigo ${cid} no existe`,
    });
  next();
};

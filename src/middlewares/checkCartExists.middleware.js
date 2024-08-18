import { request, response } from 'express';
import cartRepository from '../persistence/mongoDB/cart.repository.js';

export const checkCartExists = async (req = request, res = response, next) => {
  const { cid } = req.params;
  const cartExists = await cartRepository.getById(cid);
  if (!cartExists)
    return res.status(404).json({
      status: 'error',
      msg: `el carrito con el codigo ${cid} no existe`,
    });
  next();
};

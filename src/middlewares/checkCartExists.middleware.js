import { request, response } from 'express';
import cartDao from '../dao/mongoDB/cart.dao.js';

export const checkCartExists = async (req = request, res = response, next) => {
  const { cid } = req.params;
  const cartExists = await cartDao.getById(cid);
  if (!cartExists)
    return res.status(404).json({
      status: 'error',
      msg: `el carrito con el codigo ${cid} no existe`,
    });
  next();
};

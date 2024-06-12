import { request, response } from 'express';
import productDao from '../dao/mongoDB/product.dao.js';
export const checkProductExists = async (
  req = request,
  res = response,
  next
) => {
  const { pid } = req.params;
  const productExists = await productDao.getById(pid);
  if (!productExists)
    return res.status(404).json({
      status: 'error',
      msg: `el producto con el codigo ${pid} no existe`,
    });
  next();
};

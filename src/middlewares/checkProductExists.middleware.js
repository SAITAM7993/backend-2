import { request, response } from 'express';
import productRepository from '../persistence/mongoDB/product.repository.js';
import isHexadecimal24Chars from './genericControls/checkHexadecimal.js';
export const checkProductExists = async (
  req = request,
  res = response,
  next
) => {
  const { pid } = req.params;
  if (!isHexadecimal24Chars(pid)) {
    return res.status(404).json({
      status: 'error',
      msg: `el dato ingresado debe ser un hexadecimal de 24 caracteres válido`,
    });
  }
  const productExists = await productRepository.getById(pid);
  if (!productExists)
    return res.status(404).json({
      status: 'error',
      msg: `el producto con el codigo ${pid} no existe`,
    });
  next();
};

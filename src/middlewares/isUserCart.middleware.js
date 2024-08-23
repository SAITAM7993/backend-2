//control de que el carrito sea del usuario indicado
import { request, response } from 'express';

export const isUserCart = async (req = request, res = response, next) => {
  const { cid } = req.params;
  if (req.user.cart !== cid)
    return res.status(401).json({ status: 'error', msg: 'Wrong cart user' }); //si el carrito es distinto al carrito asociado al usuario doy error
  next();
};

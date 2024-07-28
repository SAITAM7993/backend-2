//middleware para autorizar
import { request, response } from 'express';
export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user)
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' }); //si no existe el user no esta autorizado
    if (req.user.role != role)
      return res.status(403).json({ status: 'error', msg: 'No permission' }); //si existe pero no tiene el rol requerido no esta autorizado

    next();
  };
};

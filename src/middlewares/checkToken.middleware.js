//chequeo de otken
import { request, response } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const checkToken = async (req = request, res = response, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ status: 'error', msg: 'Token not provided' }); //si no tengo el token en las cookies significa que no lo tiene.. doy error

    const tokenVerify = verifyToken(token);
    if (!tokenVerify)
      return res.status(401).json({ status: 'error', msg: 'Invalid Token' }); //si el token no coincide es invalido

    req.user = verifyToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' }); //si da otro error devuelvo server error
  }
};

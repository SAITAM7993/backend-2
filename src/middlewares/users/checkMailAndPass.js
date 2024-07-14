import { request, response } from 'express';

export const checkMailAndPass = async (req = request, res = response, next) => {
  const { email, password } = req.body;
  const user = await userDao.getByEmail(email);
  //si no encuentra usuario
  if (!user || user.password !== password)
    return res
      .status(401)
      .json({ status: 'error', msg: 'email or password incorrect' });
  next();
};

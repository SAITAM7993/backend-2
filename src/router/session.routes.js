import { Router } from 'express';
import userDao from '../dao/mongoDB/user.dao.js';

const router = Router();

//CREO USUARIO
router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const user = await userDao.create(userData);
    if (!user)
      return res.status(400).json({ status: 'error', msg: 'User not created' });

    return res.status(201).json({ status: 'success', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

//HAGO LOGIN DE USUARIO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === 'admin@admin.com' && password === 'admin123') {
      //email a fuego de admin
      req.session.user = {
        email,
        role: 'admin', //seteo el rol admin
      };
      return res
        .status(200)
        .json({ status: 'success', user: req.session.user });
    }
    //si no viene usuario o password doy error
    const user = await userDao.getByEmail(email);
    if (!user || user.password !== password)
      return res
        .status(401)
        .json({ status: 'error', msg: 'email or password incorrect' });
    req.session.user = {
      email,
      role: 'user',
    };
    return res.status(200).json({ status: 'success', user: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

router.get('/current', async (req, res) => {
  const user = await userDao.getByEmail(req.session.user.email);

  res.status(200).json({ status: 'success', user });
});

export default router;

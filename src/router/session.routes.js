import { Router } from 'express';
import userDao from '../dao/mongoDB/user.dao.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js'; //para hasheo de pass
import passport from 'passport'; //passport
import { createToken } from '../utils/jwt.js'; //para tokens
import { passportCall } from '../middlewares/passport.middleware.js';

const router = Router();

//CREO USUARIO
//metodo con passport local
router.post('/register', passportCall('register'), async (req, res) => {
  try {
    res.status(201).json({ status: 'ok', msg: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

/* metodo viejo
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
});*/

//HAGO LOGIN DE USUARIO local
router.post('/login', passportCall('login'), async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ status: 'ok', payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

//auth con JWT local
router.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getByEmail(email);
    if (!user || !isValidPassword(user.password, password))
      return res
        .status(401)
        .json({ status: 'error', msg: 'incorrect email or password ' }); //si usuario o pass es incorrecto le doy error, sino creo un token
    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ status: 'ok', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

/* metodo viejo
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
});*/

//estrategia de terceros
//inicio/reg con google
//para probar esto debemos dirigirnos (en el navegador) al endpoint configurado para la estrategia de logeo/ registro en este caso http://localhost:8080/api/session/google
router.get(
  '/google',
  passport.authenticate('google', {
    //esto son los alcances de auth 2.0 para la api de google, en la pag https://developers.google.com/identity/protocols/oauth2/scopes?hl=es-419 //seccion (buscar API de Google OAuth2, v2)
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    session: false,
  }),
  async (req, res) => {
    try {
      return res.status(200).json({ status: 'ok', payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
  }
);

router.get('/current', passportCall('current'), async (req, res) => {
  res.status(200).json({ status: 'ok', user: req.user });
});

export default router;

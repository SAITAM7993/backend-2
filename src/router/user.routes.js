import { Router } from 'express';
//import userDao from '../dao/mongoDB/user.dao.js'; -ya no se hace aca
//import { createHash, isValidPassword } from '../utils/hashPassword.js'; //para hasheo de pass -ya no se hace aca
import passport from 'passport'; //passport
import userControllers from '../controllers/user.controllers.js';
import { passportCall } from '../middlewares/passport.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

//CREO USUARIO
//metodo con passport local
router.post('/register', passportCall('register'), userControllers.createUser);

//HAGO LOGIN DE USUARIO local
router.post('/login', passportCall('login'), userControllers.loginUser);

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
  userControllers.loginUserGoogle
);

//usuario actual
router.get('/current', passportCall('current'), userControllers.currentUser);

//obtener usuarios
router.get(
  '/users',
  passportCall('jwt'),
  authorization('admin'),
  userControllers.getUsers
);

//obtener usuario por email
router.get(
  '/users/:email',
  passportCall('jwt'),
  authorization('admin'),
  userControllers.getUserByEmail
);

export default router;

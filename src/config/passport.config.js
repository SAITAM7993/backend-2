import passport from 'passport';
import google from 'passport-google-oauth20';
import jwt from 'passport-jwt';
import local from 'passport-local';
import passportCustom from 'passport-custom';
import cartDao from '../dao/mongoDB/cart.dao.js';
import userDao from '../dao/mongoDB/user.dao.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import envs from './envs.config.js';
import { verifyToken } from '../utils/jwt.js';
//estrategias, locales, google y jwt
const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

//estrategia custom
const CustomStrategy = passportCustom.Strategy;

//dentro estan TODAS las estrategias que creemos
export const initializePassport = () => {
  passport.use(
    'register', // nombre de la estrategia (a eleccion)
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' }, //callback son funciones que ejecutamos dentro de otras funciones
      async (req, username, password, done) => {
        /* 
      "register" es el nombre de estrategia que creamos
      passReqToCallback: true, permite acceder a la request en la función de autenticación
      usernameField: "email", permite definir el campo que usaremos como username
      done es la función que debemos llamar cuando terminamos de procesar la autenticación
      passport recibe dos datos el username y el password, en caso de que no tengamos un campo username podemos usar usernameField para definir el campo que usaremos como username.
      */
        try {
          const { first_name, last_name, age } = req.body;
          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: 'User already exists' }); //si existe usuario devuelvo que ya existe
          //el primer parametro es si hay un error, como no hay error en si de passport va en null, en el segundo le pasamos el usuario, como ya existe no lo devuelvo (y ademas es un register), el tercer parametro es el mensaje

          const cart = await cartDao.create(); //en caso contrario lo creo con su carrito asociado
          const newUser = {
            first_name,
            last_name,
            password: createHash(password), //el pass la creo con la funcion que hashea entonces la guarda hasheada en la bdd
            email: username,
            age,
            cart: cart._id, //le paso el carrito asi queda asociado al user
          };

          const userCreate = await userDao.create(newUser); //uso el userdao para crearlo y obtenerlo

          return done(null, userCreate); //devuelvo el usuario creado
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username);

          if (!user || !isValidPassword(user.password, password))
            return done(null, false, { message: 'User or email invalid' });

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // Estrategia de Google
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/session/google',
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          /* EJEMPLO RESPUESTA PROFILE
          {
  id: '104975445577255703571',
  displayName: 'matias sanguinet',
  name: { familyName: 'sanguinet', givenName: 'matias' },
  emails: [ { value: 'rmsrcel@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a/ACg8ocIW8nDisNBJQcNl83I_VeXtveWYtoAILxQckw3_JS9qoWqUttko=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "104975445577255703571",\n' +
    '  "name": "matias sanguinet",\n' +
    '  "given_name": "matias",\n' +
    '  "family_name": "sanguinet",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocIW8nDisNBJQcNl83I_VeXtveWYtoAILxQckw3_JS9qoWqUttko\\u003ds96-c",\n' +
    '  "email": "rmsrcel@gmail.com",\n' +
    '  "email_verified": true\n' +
    '}',
  _json: {
    sub: '104975445577255703571',
    name: 'matias sanguinet',
    given_name: 'matias',
    family_name: 'sanguinet',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocIW8nDisNBJQcNl83I_VeXtveWYtoAILxQckw3_JS9qoWqUttko=s96-c',
    email: 'rmsrcel@gmail.com',
    email_verified: true
  }
}
          */
          const { name, emails } = profile; //tomamos los datos devueltos por google
          const user = await userDao.getByEmail(emails[0].value); //en este caso obtenemos el mail de los datos devueltos por google

          if (user) {
            //si existe devuelvo el user
            return cb(null, user);
          } else {
            //sino lo creo
            const newUser = {
              first_name: name.givenName, //estos campos givenName y familyName son de la cuenta de google
              last_name: name.familyName,
              email: emails[0].value,
            };

            const userCreate = await userDao.create(newUser);
            return cb(null, userCreate); //cb es callback, le pasamos error null y el usuario creado
          }
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  // Estrategia de JWT
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envs.JWT_SECRET_CODE,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //estrategia personalizada para obtener el usuario logeado
  passport.use(
    'current',
    new CustomStrategy(async (req, done) => {
      try {
        const token = cookieExtractor(req);
        if (!token) return done(null, false);
        const tokenVerify = verifyToken(token);
        if (!tokenVerify) return done(null, false);
        const user = await userDao.getByEmail(tokenVerify.email);
        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  /* 
  La serialización permite almacenar y deserializacion recuperar información del usuario en la sesión.
  La serialización es el proceso de convertir un objeto de usuario en un id único.
  La deserialización es el proceso de recuperar un objeto de usuario a partir de un id único.
  Los datos del user se almacenan en la sesión y se recuperan en cada petición.
  */

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

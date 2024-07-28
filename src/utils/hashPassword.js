import bcrypt from 'bcrypt';

// Hasheo de contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //salt por lo general es 10, se puede usar cualquiera
};

// valido las contraseñas
export const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};

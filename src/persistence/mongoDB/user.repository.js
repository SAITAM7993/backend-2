import { userModel } from './models/user.model.js';

//OBTENGO todos los usuarios
const getUsers = async (query, options) => {
  const users = await userModel.paginate(query, options);
  return users;
};

// //OBTENGO USUARIO por ID
// const getById = async (id) => {
//   const user = await userModel.findById(id);
//   return user;
// };

//OBTENGO USUARIO por EMAIL
const getByEmail = async (email) => {
  const user = await userModel.findOne({ email: email });
  return user;
};

//CREO USUARIO
const create = async (data) => {
  const user = await userModel.create(data);
  return user;
};

//MODIFICO USUARIO
const update = async (id, data) => {
  const userUpdate = await userModel.findByIdAndUpdate(id, data, { new: true });
  return userUpdate;
};

//BORRO UN USUARIO
const deleteOne = async (id) => {
  const user = await userModel.findByIdAndUpdate(
    id,
    { status: false }, //seteo el status en false para (hago borrado logico)
    { new: true }
  );
  return user;
};

export default {
  getUsers,
  create,
  update,
  deleteOne,
  getByEmail,
};

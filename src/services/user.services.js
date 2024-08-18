import userRepository from '../persistence/mongoDB/user.repository.js';

const createUser = async () => {
  return await userRepository.create();
};
const getUsers = async (query, options) => {
  return await userRepository.getUsers(query, options);
};
const getUserByEmail = async (email) => {
  const user = await userRepository.getByEmail(email);
  return user;
};
// const updateUser = async () => {};
// const deleteUser = async () => {};
export default {
  createUser,
  getUsers,
  getUserByEmail,
  //   updateUser,
  //   deleteUser,
};

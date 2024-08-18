//import sessionServices from '../services/session.services.js';
import userServices from '../services/user.services.js';
import { createToken } from '../utils/jwt.js';
const createUser = async (req, res) => {
  try {
    res.status(201).json({ status: 'success', msg: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ status: 'success', payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
};

const loginUserGoogle = async (req, res) => {
  try {
    return res.status(200).json({ status: 'success', payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
};

const currentUser = async (req, res) => {
  res.status(200).json({ status: 'success', user: req.user });
};

const getUsers = async (req, res) => {
  try {
    const { limit, page, sort, role } = req.query; //todo esto es optativo

    const options = {
      limit: limit || 10, //si no viene limite por defecto queda en 10
      page: page || 1, //si no viene pagina, por defecto queda en 1
      sort: { first_name: sort === 'asc' ? 1 : -1 },
      learn: true,
    };

    //si filtran por el rol
    if (role) {
      const users = await userServices.getUsers({ role }, options);
      return res.status(200).json({ status: 'success', users });
    }
    const users = await userServices.getUsers({}, options);
    return res.status(200).json({ status: 'success', users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userServices.getUserByEmail(email);
    res.status(200).json({ status: 'success', user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

export default {
  createUser,
  loginUser,
  loginUserGoogle,
  currentUser,
  getUsers,
  getUserByEmail,
};

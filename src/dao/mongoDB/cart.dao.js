import { cartModel } from './models/cart.model.js';

//trae todos los carritos
const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

//busca un carrito
const getById = async (id) => {
  const cart = await cartModel.findById(id).populate('products.product'); //importante, esto hace que en la consulta con el id de producto se traigan todos los datos
  return cart;
};

//crea un carrito
const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

//update de carrito
const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

//borrado de carrito
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

//agregar prod a carrito
const addProductToCart = async (cid, pid) => {
  // const cartUpdated = await cartModel.findOneAndUpdate(
  //   { _id: cid, 'products.$.product': pid },
  //   { $inc: { 'products.$.quantity': 1 } },
  //   { new: true }
  // );
  // //si no puede hacer el update porque no encuentra el prod, lo agrega
  // if (!cartUpdated) {
  //   await cartModel.updateOne(
  //     { _id: cid },
  //     { $push: { products: pid, quantity: 1 } }
  //   );
  // }
  // return cartUpdated;

  let cart = await cartModel.findOneAndUpdate(
    { _id: cid, 'products.product': pid },
    { $inc: { 'products.$.quantity': 1 } }
  );
  if (!cart) {
    await cartModel.updateOne(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }
  const cartUpdated = await cartModel.findById(cid);
  return cartUpdated;
};
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
};

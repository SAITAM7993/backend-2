import { cartModel } from './models/cart.model.js';

//trae todos los carritos
const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

//busca un carrito
const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

//crea un carrito
const create = async () => {
  const cart = await cartModel.create();
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
const addProductToCart = async (id, product) => {
  const cartAux = await cartModel.findById(id);

  const indexP = cartAux.products.findIndex((prod) => prod.pid === pid); //busco el producto en el carrito
  //si no lo encuentra lo agrego con qty 1
  const cart = [];
  if (indexP === -1) {
    cart = await cartModel.findByIdAndUpdate(
      id,
      { $push: { products: product } },
      { new: true }
    );
  } else {
    //sino le agrego 1 a qty
    let productQty = (cart.product[indexP].qty += 1);
    cart = await cartModel.findByIdAndUpdate(
      id,
      { qty: productQty },
      { new: true }
    );
  }

  return cart;
};
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
};

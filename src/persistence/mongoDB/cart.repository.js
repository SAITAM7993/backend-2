//esta capa solo se comunica con la bdd no debe tener nada de la logica de negocio ni controles
import { cartModel } from './models/cart.model.js';

//trae todos los carritos
const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

//busca un carrito
const getById = async (cid) => {
  const cart = await cartModel.findById(cid).populate('products.product'); //importante, esto hace que en la consulta con el id de producto se traigan todos los datos
  return cart;
};

//crea un carrito
const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

//update de carrito
const update = async (cid, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(cid, data, {
    new: true,
  });
  return cartUpdate;
};

//borrado de carrito
const deleteOne = async (cid) => {
  const cart = await cartModel.deleteOne({ _id: cid });
  return cart;
};

//agregar prod a carrito
const addProductToCart = async (cid, pid) => {
  //este cod es JS solamente
  const cart = await cartModel.findById(cid); //busca carrito

  const productInCart = cart.products.find((element) => element.product == pid); //busco el producto en el carrito

  if (productInCart) {
    //si lo encuentro le agrego 1 a la propiedad quantity
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 }); //si no lo encuentro, lo agrego al carrito con cantidad 1
  }

  await cart.save(); //con el save guardamos los cambios
  return cart;
};

//borra UN producto del carrito
const deleteProductFromCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid); //busca carrito
  cart.products = cart.products.filter((element) => element.product != pid); //filtra, saca el producto que le pasamos .importante filtrar con  != , si compara exacto no funciona
  await cart.save(); //guardo el cart actualizado en mongo
  return cart;
};

//actualizar la cantidad de UN producto en el carrito
const updateProductQtyInCart = async (cid, pid, qty) => {
  const cart = await cartModel.findById(cid); //busca carrito
  const product = cart.products.find((element) => element.product == pid); //busco el producto en el carrito, tiene que ser con .product._id ya que el element es cart

  product.quantity = qty; //le asigno la cantidad nueva
  await cart.save(); //guardo el cart actualizado en mongo
  return cart;
};

//borrar carrito
const clearCart = async (cid) => {
  const cart = await cartModel.findById(cid); //busca carrito
  cart.products = [];
  await cart.save();
  return cart;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductFromCart,
  updateProductQtyInCart,
  clearCart,
};

import cartServices from '../services/cart.services.js';
import ticketServices from '../services/ticket.services.js';
//controladores de carrito, tienen la logica de negocio
const createCart = async (req, res) => {
  try {
    const cart = await cartServices.createCart(); //llama al servicio que crea el carrito, este servicio llama al dao que es la capa de persistencia
    res.status(201).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params; //obtengo cid de los parms
    const cart = await cartServices.getCartById(cid);
    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await cartServices.getCarts();
    if (!carts)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'No existen carritos' });

    res.status(200).json({ status: 'success', carts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    //hago controles de existencia en los middlewares
    const { cid, pid } = req.params; //obtengo cid y pid de parms
    const cart = await cartServices.addProductToCart(cid, pid);
    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    //hago controles de existencia en los middlewares
    const { cid, pid } = req.params; //obtengo cid y pid de parms
    const cart = await cartServices.removeProductFromCart(cid, pid);
    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const updateProductQty = async (req, res) => {
  try {
    //hago controles de existencia en los middlewares
    const { cid, pid } = req.params; //obtengo cid y pid de parms
    const { quantity } = req.body; //obtengo qty del body del request, importante que se llame igual a lo que le pase
    const cart = await cartServices.updateProductQty(
      cid,
      pid,
      Number(quantity)
    );
    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const clearCart = async (req, res) => {
  try {
    //hago controles de existencia en los middlewares
    const { cid } = req.params; //obtengo cid y pid de parms
    const cart = await cartServices.clearCart(cid);
    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};
const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Carrito no encontrado' });
    const total = await cartServices.purchaseCart(cid);
    const ticket = await ticketServices.createTicket(
      req.user.email,
      total,
      cart.products
    );

    res.status(200).json({ status: 'success', ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Erro', msg: 'Error interno del servidor' });
  }
};

export default {
  createCart,
  getCartById,
  getCarts,
  addProductToCart,
  removeProductFromCart,
  updateProductQty,
  clearCart,
  purchaseCart,
};

import { Router } from 'express';
// import cartManager from '../dao/fileSystem/managers/cart.manager.js'; // ya no se usan los managers, reemplazado por los daos
// import productManager from '../dao/fileSystem/managers/product.manager.js';
import cartDao from '../dao/mongoDB/cart.dao.js';
import productDao from '../dao/mongoDB/product.dao.js';

const router = Router();

//CREAR CARRITO *************************************
router.post('/', async (req, res) => {
  try {
    // const cart = await cartManager.createCart(); //creo carrito
    const cart = await cartDao.create();
    res.status(201).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//OBTENER CARRITO PRO CID *************************************
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params; //obtengo cid de los parms
    // const cart = await cartManager.getCartById(cid) //reemplazado por cartdao
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: 'Error', msg: 'Carrito no encontrado' });

    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//OBTENER CARRITOS *************************************
router.get('/', async (req, res) => {
  try {
    // const carts = await cartManager.getCarts();
    const carts = await cartDao.getAll();
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
});

//AGREGAR PRODUCTO A CARRITO *************************************
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params; //obtengo cid y pid de parms

    //busco el producto
    // const product = await productManager.getProductById(pid);
    const product = await productDao.getById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Producto no encontrado' });

    // const cart = await cartManager.addProductToCart(cid, pid);
    const cart = await cartDao.addProductToCart(cid, pid);
    if (!cart)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Carrito no encontrado' });

    res.status(200).json({ status: 'success', cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

export default router;

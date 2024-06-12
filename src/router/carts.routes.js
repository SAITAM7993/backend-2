import { Router } from 'express';
// import cartManager from '../dao/fileSystem/managers/cart.manager.js'; // ya no se usan los managers, reemplazado por los daos
// import productManager from '../dao/fileSystem/managers/product.manager.js';
import cartDao from '../dao/mongoDB/cart.dao.js';
import productDao from '../dao/mongoDB/product.dao.js';
import { checkProductExists } from '../middlewares/checkProductExists.middleware.js';
import { checkCartExists } from '../middlewares/checkCartExists.middleware.js';

const router = Router();

//CREAR CARRITO *************************************
router.post('/', async (req, res) => {
  try {
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
router.get('/:cid', checkCartExists, async (req, res) => {
  try {
    const { cid } = req.params; //obtengo cid de los parms
    const cart = await cartDao.getById(cid);
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
router.post(
  '/:cid/product/:pid',
  checkProductExists,
  checkCartExists,
  async (req, res) => {
    try {
      //hago controles de existencia en los middlewares
      const { cid, pid } = req.params; //obtengo cid y pid de parms
      const cart = await cartDao.addProductToCart(cid, pid);

      res.status(200).json({ status: 'success', cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: 'error', msg: 'Error interno del servidor' });
    }
  }
);

export default router;

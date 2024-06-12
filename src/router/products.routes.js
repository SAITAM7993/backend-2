import { Router } from 'express';
// import productManager from '../dao/fileSystem/managers/product.manager.js'; // dejamos de usar el prod manager
import productDao from '../dao/mongoDB/product.dao.js'; //empezamos a usar el dao de mongo
import { checkProductAdd } from '../middlewares/products/checkProductAdd.middleware.js';
import { checkProductUpdate } from '../middlewares/products/checkProductUpdate.middleware.js';
import { checkProductFields } from '../middlewares/products/checkProductFields.middleware.js';
import { checkProductExists } from '../middlewares/checkProductExists.middleware.js';
const router = Router();

//OBTENER PRODUCTOS TODOS Y LIMIT *************************************
router.get('/', async (req, res) => {
  try {
    //dejamos de usar el product manager
    // const { limit } = req.query;
    // const products = await productManager.getProducts(limit);
    const products = await productDao.getAll();
    res.status(200).json({ status: 'success', products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//OBTENER UN PRODUCTO *************************************
router.get('/:pid', checkProductExists, async (req, res) => {
  try {
    //ya hago el control de si existe el prod en el middleware
    const { pid } = req.params;
    const product = await productDao.getById(pid);
    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//BORRAR UN PRODUCTO *************************************
router.delete('/:pid', checkProductExists, async (req, res) => {
  try {
    //hago el control en el middleware
    const { pid } = req.params;
    await productDao.deleteOne(pid);
    res.status(200).json({
      status: 'success',
      msg: `el producto con el id ${pid} fue eliminado`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'error interno del servidor' });
  }
});

//MODIFICAR UN PRODUCTO *************************************
router.put(
  '/:pid',
  checkProductExists,
  checkProductFields,
  checkProductUpdate,
  async (req, res) => {
    try {
      //ya hago los controles en middleware
      const { pid } = req.params;
      const productData = req.body;
      const product = await productDao.update(pid, productData);
      res.status(200).json({ status: 'success', product });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: 'error', msg: 'Error interno del servidor' });
    }
  }
);

//CREAR UN PRODUCTO *************************************
router.post('/', checkProductFields, checkProductAdd, async (req, res) => {
  try {
    // const body = req.body;
    // const product = await productManager.addProduct(body);
    const productData = req.body;
    const product = await productDao.create(productData);
    res.status(201).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});
export default router;

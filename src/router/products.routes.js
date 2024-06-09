import { Router } from 'express';
// import productManager from '../dao/fileSystem/managers/product.manager.js'; // dejamos de usar el prod manager
import productDao from '../dao/mongoDB/product.dao.js'; //empezamos a usar el dao de mongo
import { checkProductAdd } from '../middlewares/products/checkProductAdd.middleware.js';
import { checkProductUpdate } from '../middlewares/products/checkProductUpdate.middleware.js';
import { checkProductFields } from '../middlewares/products/checkProductFields.middleware.js';
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
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await productManager.getProductById(pid);
    const product = await productDao.getById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Producto no encontrado' });

    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//BORRAR UN PRODUCTO *************************************
router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await productManager.deleteProduct(Number(pid));IMPORTANTE CUANDO USEMOS MONGO DESCOMENTAR ESTA LIN Y BORRAR LA DE ABAJO
    // const product = await productManager.deleteProduct(pid);
    const product = await productDao.deleteOne(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: 'error', msg: 'Producto no encontrado' });

    res.status(200).json({
      status: 'success',
      msg: `El producto con el id ${pid} fue eliminado`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
});

//MODIFICAR UN PRODUCTO *************************************
router.put(
  '/:pid',
  checkProductFields,
  checkProductUpdate,
  async (req, res) => {
    try {
      const { pid } = req.params;
      const productData = req.body;
      // const body = req.body;
      // const product = await productManager.updateProduct(pid, body);
      const product = await productDao.update(pid, productData);
      if (!product)
        return res
          .status(404)
          .json({ status: 'error', msg: 'Producto no encontrado' });

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

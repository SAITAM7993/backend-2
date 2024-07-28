import { Router } from 'express';
// import productManager from '../dao/fileSystem/managers/product.manager.js'; // dejamos de usar el prod manager
import productDao from '../dao/mongoDB/product.dao.js'; //empezamos a usar el dao de mongo
import { checkProductAdd } from '../middlewares/products/checkProductAdd.middleware.js';
import { checkProductUpdate } from '../middlewares/products/checkProductUpdate.middleware.js';
import { checkProductFields } from '../middlewares/products/checkProductFields.middleware.js';
import { checkProductExists } from '../middlewares/checkProductExists.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';
import { passportCall } from '../middlewares/passport.middleware.js';
const router = Router();

//OBTENER PRODUCTOS TODOS Y LIMIT *************************************
router.get(
  '/',
  passportCall('jwt'), //si el jwt no da un ok no le muestro los productos
  authorization('admin'), //si no es admin no dejo que vea todos los prod
  async (req, res) => {
    //se hace una llamada a passport y atorizamos con authorization
    try {
      //se agrega paginate
      const { limit, page, sort, category, status } = req.query; //todo esto es optativo

      const options = {
        limit: limit || 10, //si no viene limite por defecto queda en 10
        page: page || 1, //si no viene pagina, por defecto queda en 1
        sort: { price: sort === 'asc' ? 1 : -1 }, //ordena por precio, si no viene el sort asc se ordena descendente
        learn: true,
      };
      //nota mas adelante agregar un tolowercase en category para buscar y al insertar, por ahora no pude, se rompe y no trae nada, tambien agregar el filtro por dos o mas cosas a la vez ej categoria y status, ahora solo funciona con un filtro a la vez

      //si solicitan categoria
      if (category) {
        const products = await productDao.getAll({ category }, options);
        return res.status(200).json({ status: 'success', products });
      }

      //si solicitan por status
      if (status) {
        const products = await productDao.getAll({ status }, options);
        return res.status(200).json({ status: 'success', products });
      }

      //si viene sin categoria no le paso filtro, solo las opciones
      const products = await productDao.getAll({}, options);
      return res.status(200).json({ status: 'success', products });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: 'error', msg: 'Error interno del servidor' });
    }
  }
);

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

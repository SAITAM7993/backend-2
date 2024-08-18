import { Router } from 'express';
import porductControllers from '../controllers/product.controllers.js';
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
  passportCall('jwt'),
  porductControllers.getProducts //si el jwt no da un ok no le muestro los productos
  //authorization('admin'), //si no es admin no dejo que vea todos los prod, lo cambio ya que todos los deberian ver
);

//OBTENER UN PRODUCTO *************************************
router.get(
  '/:pid',
  passportCall('jwt'),
  checkProductExists,
  porductControllers.getProductById
);

//BORRAR UN PRODUCTO *************************************
router.delete(
  '/:pid',
  checkProductExists,
  passportCall('jwt'),
  authorization('admin'),
  porductControllers.deleteProduct
);

//MODIFICAR UN PRODUCTO *************************************
router.put(
  '/:pid',
  passportCall('jwt'),
  authorization('admin'), //agrego que necesite ser admin para modificar
  checkProductExists,
  checkProductFields,
  checkProductUpdate,
  porductControllers.updateProduct
);

//CREAR UN PRODUCTO *************************************}
//agrego que necesite ser admin para crear
router.post(
  '/',
  passportCall('jwt'),
  authorization('admin'),
  checkProductFields,
  checkProductAdd,
  porductControllers.createProduct
);
export default router;

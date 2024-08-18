import { Router } from 'express';
import { checkProductExists } from '../middlewares/checkProductExists.middleware.js';
import { checkCartExists } from '../middlewares/checkCartExists.middleware.js';
import { checkProductQtyUpdate } from '../middlewares/checkProductQtyUpdate.js';
import { authorization } from '../middlewares/authorization.middleware.js';
import { passportCall } from '../middlewares/passport.middleware.js';
import cartControllers from '../controllers/cart.controllers.js';

//nota: definir los controles sobre carritos, ej si para crear carrito hay que ser admin.. ver si afecta en el back al crear el carrito automaticamente cuando se crea el usuario, se agregaron algunos controles de autorizacion segun creia conveniente, casi todos controlan el jwt

const router = Router();

//CREAR CARRITO *************************************
router.post('/', cartControllers.createCart);

//OBTENER CARRITO PRO CID *************************************
router.get('/:cid', cartControllers.getCartById);

//OBTENER CARRITOS *************************************
router.get(
  '/',
  passportCall('jwt'),
  authorization('admin'),
  cartControllers.getCarts
);
//AGREGAR PRODUCTO A CARRITO *************************************
router.post(
  '/:cid/product/:pid',
  passportCall('jwt'),
  checkProductExists,
  checkCartExists,
  cartControllers.addProductToCart
);

//BORRAR PRODUCTO A CARRITO *************************************
router.delete(
  '/:cid/product/:pid',
  passportCall('jwt'),
  checkProductExists,
  checkCartExists,
  cartControllers.removeProductFromCart
);

//MODIFICA CANTIDAD DE UN PRODUCTO EN EL CARRITO *************************************
router.put(
  '/:cid/product/:pid',
  passportCall('jwt'),
  checkProductExists,
  checkCartExists,
  checkProductQtyUpdate,
  cartControllers.updateProductQty
);

//BORRAR PRODUCTO A CARRITO *************************************
router.delete(
  '/:cid',
  passportCall('jwt'),
  checkCartExists,
  cartControllers.clearCart
);

//GENERAR COMPRA *************************************
router.get('/:cid/purchase', passportCall('jwt'), cartControllers.purchaseCart);

export default router;

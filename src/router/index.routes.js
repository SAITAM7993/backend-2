import { Router } from 'express';
import productRouter from './product.routes.js';
import cartRouter from './cart.routes.js';
import userRouter from './user.routes.js';

const router = Router();

router.use('/products', productRouter);
router.use('/carts', cartRouter);
router.use('/session', userRouter);

//para controlar rutas que ingresen, si no existe la ruta devuelvo error, funciona para TODAS las rutas, PRODUCTS, CART, SESSION
router.get('*', async (req, res) => {
  try {
    res.status(404).json({ status: 'error', msg: 'Route not found' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});
export default router;

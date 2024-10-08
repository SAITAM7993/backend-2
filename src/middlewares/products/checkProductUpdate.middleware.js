import { request, response } from 'express';
// import productManager from '../../dao/fileSystem/managers/product.manager.js'; // ya no se utiliza, reemplazado por productRepository
import productRepository from '../../persistence/mongoDB/product.repository.js';

export const checkProductUpdate = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { code } = req.body;
    const { pid } = req.params;
    //const products = await productManager.getProducts(); //obtengo todos los productos
    const products = await productRepository.getAll();
    const productExists = products.docs.find((p) => p.code === code); // Valida que no se repita el campo de code

    //con esto le dejo modificar si justo le envio el mismo codigo que tenia el propio producto (ej id 1 codigo 1, si encuentro el codigo 1 en id 2 ahi le tiero el error)
    if (productExists && productExists.pid !== pid)
      return res.status(400).json({
        status: 'error',
        msg: `el producto con el código ${code} ya existe`,
      });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'error interno del servidor' });
  }
};

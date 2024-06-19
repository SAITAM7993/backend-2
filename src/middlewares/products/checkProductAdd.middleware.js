import { request, response } from 'express';
// import productManager from '../../dao/fileSystem/managers/product.manager.js'; //ya no usamos prod manager
import productDao from '../../dao/mongoDB/product.dao.js'; //reemplaza a prod manager

export const checkProductAdd = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body; //desestructuro el producto
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };
    const products = await productDao.getAll(); //obtengo todos los productos
    const productExists = products.docs.find((p) => p.code === code); // Valida que no se repita el campo de code, se agrega el .docs ya que ahora productos viene dentro de docs
    if (productExists)
      return res.status(400).json({
        status: 'error',
        msg: `el producto con el código ${code} ya existe`,
      });

    const checkData = Object.values(newProduct).includes(undefined); // Valida que los campos obligatorios vengan
    if (checkData)
      return res
        .status(400)
        .json({ status: 'error', msg: 'todos los datos son obligatorios' });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'error interno del servidor' });
  }
};

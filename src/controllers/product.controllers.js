import productServices from '../services/product.services.js';
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await productServices.createProduct(productData);
    res.status(201).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productServices.getProductById(pid);
    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const getProducts = async (req, res) => {
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
      const products = await productServices.getProducts({ category }, options);
      return res.status(200).json({ status: 'success', products });
    }

    //si solicitan por status
    if (status) {
      const products = await productServices.getProducts({ status }, options);
      return res.status(200).json({ status: 'success', products });
    }

    //si viene sin categoria no le paso filtro, solo las opciones
    const products = await productServices.getProducts({}, options);
    return res.status(200).json({ status: 'success', products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const updateProduct = async (req, res) => {
  try {
    //ya hago los controles en middleware

    const { pid } = req.params;
    const productData = req.body;
    const product = await productServices.updateProduct(pid, productData);
    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'Error interno del servidor' });
  }
};

const deleteProduct = async (req, res) => {
  //agrego que necesite ser admin para borrar
  try {
    //hago el control en el middleware
    const { pid } = req.params;
    await productServices.deleteOne(pid);
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
};

export default {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};

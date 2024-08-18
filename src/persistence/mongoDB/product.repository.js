import { productModel } from './models/product.model.js';
//obtiene todos los productos
const getAll = async (query, options) => {
  // const products = await productModel.find({ status: true }); //se cambia por logica de paginate
  const products = await productModel.paginate(query, options);
  return products;
};

//obtiene un prod
const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

//crea un prod
const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

//modifica un prod
const update = async (id, data) => {
  // con el parm new:true trae el producto actualizado
  const productUpdate = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return productUpdate;
};

//borra un prod
const deleteOne = async (id) => {
  const product = await productModel.findByIdAndUpdate(
    id,
    { status: false }, //le cambia el valor a false
    { new: true }
  );
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};

import { respProductDto } from '../dto/product.dto.js';
import productRepository from '../persistence/mongoDB/product.repository.js';

const createProduct = async (data) => {
  return await productRepository.create(data);
};

const getProductById = async (pid) => {
  const product = await productRepository.getById(pid);
  const productResponse = respProductDto(product);
  return productResponse;
};

const getProducts = async (query, options) => {
  return await productRepository.getAll(query, options);
};

const updateProduct = async (pid, data) => {
  return await productRepository.create(pid, data);
};

const deleteProduct = async (pid) => {
  return await productRepository.create(pid);
};

export default {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};

import cartRepository from '../persistence/mongoDB/cart.repository.js';
import productRepository from '../persistence/mongoDB/product.repository.js';

//servicios de carrito, se comunican con la capa de persistencia (dao)
const createCart = async () => {
  return await cartRepository.create();
};

const getCartById = async (cid) => {
  return await cartRepository.getById(cid);
};

const getCarts = async () => {
  return await cartRepository.getAll();
};

const addProductToCart = async (cid, pid) => {
  return await cartRepository.addProductToCart(cid, pid);
};

const removeProductFromCart = async (cid, pid) => {
  return await cartRepository.deleteProductFromCart(cid, pid);
};

const updateProductQty = async (cid, pid, quantity) => {
  return await cartRepository.updateProductQtyInCart(cid, pid, quantity);
};

const clearCart = async (cid) => {
  return await cartRepository.clearCart(cid);
};

const purchaseCart = async (cid) => {
  //obtengo el carrito
  const cart = await cartRepository.getById(cid);
  let total = 0;
  const productsWithOutStock = []; //para contener los productos que no tengan stock

  for (const productCart of cart.products) {
    const product = await productRepository.getById(productCart.product);
    /*
    console.log(product.price);
    console.log(productCart.quantity);
    console.log(product.price * productCart.quantity);*/
    if (product.stock >= productCart.quantity) {
      //si tiene stock agrego al precio total
      total += product.price * productCart.quantity;
      await productRepository.update(product._id, {
        stock: product.stock - productCart.quantity,
      });
    } else {
      productsWithOutStock.push(productCart); //sino lo agrego a la lista de productos sin stock
    }
    await cartRepository.update(cid, { products: productsWithOutStock });
  }

  return total;
};

export default {
  createCart,
  getCartById,
  getCarts,
  addProductToCart,
  removeProductFromCart,
  updateProductQty,
  clearCart,
  purchaseCart,
};

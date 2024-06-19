//con esta func leo el archivo e inserto en mongoose con npm run seedProduct
import fs from 'fs';
import { productModel } from '../dao/mongoDB/models/product.model.js';

export const seedProductsToDB = async () => {
  try {
    const products = await fs.promises.readFile(
      './src/seed/products.json',
      'utf-8'
    );
    const parseProducts = await JSON.parse(products);
    await productModel.insertMany(parseProducts);
    console.log('Productos agregados a la base de datos');
  } catch (error) {
    console.log(error);
  }
};

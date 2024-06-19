//con esta funcion genero productos random
import fs from 'fs';

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un código de producto como "P01", "P02", etc.
function generateProductCode(index) {
  return `P${index.toString().padStart(4, '0')}`;
}

// Array para almacenar los productos
let products = [];

// Generar 5000 productos
for (let i = 1; i <= 5000; i++) {
  let product = {
    title: `Product ${i}`,
    description: `Description for Product ${i}`,
    code: generateProductCode(i),
    price: getRandomNumber(50, 500),
    stock: getRandomNumber(10, 200),
    category: getRandomCategory(),
  };
  products.push(product);
}

// Convertir a formato JSON
let jsonData = JSON.stringify(products, null, 2);

// Escribir el archivo JSON
fs.writeFile('./src/seed/products.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error al escribir el archivo JSON:', err);
  } else {
    console.log('Archivo JSON generado correctamente: products.json');
  }
});

// Función para obtener una categoría aleatoria
function getRandomCategory() {
  const categories = ['electronics', 'clothing', 'home', 'toys', 'sports'];
  return categories[getRandomNumber(0, categories.length - 1)];
}

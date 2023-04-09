const express = require('express');
const ProductManager = require('./ProductManager')

const productManager = new ProductManager('./ejemplo.txt')

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const products = await productManager.getProducts();
  const limitedProducts = limit > 0 ? products.slice(0, limit) : products; 

  return res.send(limitedProducts);
});


app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (product) {
    return res.send(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});


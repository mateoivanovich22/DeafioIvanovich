import { Router } from "express";
import fs from "fs";

const router = Router();
let carts = [];
let lastId = 0;
let products = [];
/*let productsOfFile = [];

async function readProductsFromFile() {
  try {
    const data = await fs.promises.readFile('products.json');
    productsOfFile = JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo: ${error}`);
  }
}*/

const writeCartsToFile = async (fileName) => {
  try {
    const cartsJSON = JSON.stringify(carts);
    const filePath = `${fileName}.json`;
    await fs.promises.writeFile(filePath, cartsJSON);
    console.log(
      `Los carritos se han agregado correctamente al archivo ${fileName}`
    );
  } catch (err) {
    console.error(`Error al escribir en el archivo: ${err}`);
  }
};

router.post("/", (req, res) => {
  const newId = lastId + 1;
  lastId = newId;

  //readProductsFromFile();

  const newCart = {
    id: newId,
    products: [/*productsOfFile*/],
  };

  carts.push(newCart);
  writeCartsToFile("carts");
  res.status(201).send({
    message: "El carrito ha sido creado exitosamente.",
    data: newCart,
  });
});

router.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find((cart) => cart.id === cartId);

  if (!cart) {
    return res.status(404).send({ message: "Carrito no encontrado" });
  }

  return res.send({ products: cart.products });
});

router.post("/:cid/product/:pid", (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const { quantity } = req.body;

  const cart = carts.find((cart) => cart.id === cid);

  if (!cart) {
    return res.status(404).send({
      message: `El carrito con el id ${cid} no existe.`,
    });
  }

  const product = products.find((product) => product.id === pid);

  if (!product) {
    res.status(404).send({
      message: `El producto con el id ${pid} no existe.`,
    });
  }

  const existingProduct = cart.products.find(
    (cartProduct) => cartProduct.product == pid
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({
      product: pid,
      quantity: quantity,
    });  
  }

  writeCartsToFile("carts");
  res.send({
    message: "Producto agregado al carrito correctamente.",
    data: cart,
  });
});

export default router;

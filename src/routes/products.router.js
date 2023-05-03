const { Router } = require("express");
const fs = require("fs");

const router = Router();
let products = [];
let productId = 0;

const writeProductsToFile = async (fileName) => {
  try {
    const productsJSON = JSON.stringify(products);
    const filePath = `${fileName}.json`;
    await fs.promises.writeFile(filePath, productsJSON);
  } catch (err) {
    console.error(`Error al escribir en el archivo: ${err}`);
  }
};

const loadProductsFromFile = async (fileName) => {
  try {
    const filePath = `${fileName}.json`;
    const data = await fs.promises.readFile(filePath);
    products = JSON.parse(data.toString());
    console.log(`Los productos se han cargado correctamente desde el archivo ${fileName}`);
    return products;
  } catch (err) {
    console.error(`Error al cargar el archivo ${fileName}: ${err}`);
    return [];
  }
};

loadProductsFromFile('products');

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const limitedProducts = limit > 0 ? products.slice(0, limit) : products;
    console.log(limitedProducts)
    res.render("home", { products: limitedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


router.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = products.find((p) => p.id === id);

  if (product) {
    return res.send(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = [],
  } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  const product = {
    id: ++productId,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  products.push(product);

  console.log(products);

  writeProductsToFile("products");

  res.send({ status: "success" });
});

router.put("/:pid", (req, res) => {
  const productIdParam = parseInt(req.params.pid);
  const product = products.find((p) => p.id === productIdParam);

  if (!product) {
    res.status(404).send("Producto no encontrado");
    return;
  }

  const validParams = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
    "thumbnails",
  ];
  const params = Object.keys(req.body);

  const isValidParams = params.every((param) => validParams.includes(param));

  if (!isValidParams) {
    res.status(400).send("Parámetro inválido");
    return;
  }

  const updatedProduct = {
    ...product,
    ...req.body,
    id: productId,
  };
  const productIndex = products.findIndex((p) => p.id === productId);
  products[productIndex] = updatedProduct;

  writeProductsToFile("products");
  console.log("Producto modificado correctamente");
  res.send({
    status: "success",
    updatedProduct,
  });
});

router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);

  const index = products.findIndex((product) => product.id === productId);

  if (index !== -1) {
    products.splice(index, 1);

    writeProductsToFile("products");
    res.send({ status: "success" });
  } else {
    res.status(404).send({ error: "Producto no econtrado" });
  }
});

module.exports = router;
module.exports.loadProductsFromFile = loadProductsFromFile;

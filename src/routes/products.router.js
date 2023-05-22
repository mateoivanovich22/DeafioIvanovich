const { Router } = require("express");
const fs = require("fs");

const ProductManagerMongo = require("../dao/controllers/productManager.js")
const productManagerMongo = new ProductManagerMongo()


const router = Router();

let productId = 0;

let products = [];
const getProducts = async () => {
  try {
    products = await productManagerMongo.getProducts();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};
getProducts()

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    getProducts()
    const limitedProducts = limit > 0 ? products.slice(0, limit) : products;
    res.render("home", { products: limitedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


router.get("/:pid", async(req, res) => {
  getProducts()
  const id = req.params.pid;
  const product = await productManagerMongo.getProductById(id);

  if (product) {
    return res.send(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.post("/", async (req, res) => {
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
  getProducts()

  await productManagerMongo.createProduct(product);

  res.send({ status: "success" });
});

router.put("/:pid", async (req, res) => {
  const productIdParam = parseInt(req.params.pid);
  getProducts()
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

  const fieldsToUpdate = req.body;

  const isValidParams = Object.keys(fieldsToUpdate).every((param) =>
    validParams.includes(param)
  );

  if (!isValidParams) {
    res.status(400).send("Parámetro inválido");
    return;
  }

  await productManagerMongo.updateProduct(productIdParam, fieldsToUpdate);

  console.log("Producto modificado correctamente");

  products = await productManagerMongo.getProducts();
  res.send({
    status: "success",
  });
});


router.delete("/:pid", async(req, res) => {
  const productId = parseInt(req.params.pid);
  getProducts()
  const productDeleted = await productManagerMongo.deleteProduct(productId);

  if (productDeleted) {
    res.send({ status: "success" });
  } else {
    res.status(404).send({ error: "Producto no econtrado" });
  }
});

module.exports = router;

/*
{
    "title": "selva",
    "price": 34,
    "code": 344,
    "description": "feas",
    "category": "galles",
    "stock": 22
}
*/
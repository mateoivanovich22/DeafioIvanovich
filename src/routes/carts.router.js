const { Router } = require("express");
const fs = require("fs");

const ProductManagerMongo = require("../dao/controllers/productManager.js")
const productManagerMongo = new ProductManagerMongo()

const CartsManager = require("../dao/controllers/cartsManager.js")
const cartsManager = new CartsManager();
const cartsModel = require("../dao/models/carts.js");

const router = Router();
let productsOfMongo = [];
let cartsOfMongo = [];

const getCartsAnsProducts = async() => {
  try {
    productsOfMongo = await productManagerMongo.getProducts();
    cartsOfMongo = await cartsManager.getCarts();
    console.log(cartsOfMongo);
    return cartsOfMongo;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}
getCartsAnsProducts()

router.post("/", async (req, res) => {
  const lastProduct = await cartsModel.findOne().sort({ "products.productId": -1 }).limit(1);
  const lastProductId = lastProduct ? lastProduct.products.productId : 0;
  const newProductId = lastProductId + 1;

  const newCart = {
    products: {
      product: req.body.product,
      productId: newProductId,
      quantity: req.body.quantity
    }
  };
  
  try {
    await cartsManager.createCart(newCart);

    res.status(201).send({
      message: "El carrito ha sido creado exitosamente.",
      data: newCart,
    });
  } catch (error) {
    console.error("Error al crear carrito:", error);
    res.status(500).send("Error al crear carrito");
  }
});


router.get("/:cid", async(req, res) => {
  const cartId = req.params.cid;
  const cart = await cartsManager.getCartById(cartId)

  return res.send({ cart: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).send({
      message: "La variable 'quantity' debe ser un valor válido y mayor a cero.",
    });
  }

  if (!Number.isInteger(quantity)) {
    return res.status(400).send({
      message: "La variable 'quantity' debe ser un número entero.",
    });
  }

  const cid = req.params.cid;
  const pid = parseInt(req.params.pid);

  try {
    const updatedCart = await cartsModel.findOneAndUpdate(
      { _id: cid, "products.productId": pid },
      { $set: { "products.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).send({ message: "El producto no se encuentra en el carrito." });
    }

    return res.status(200).send({ message: "Cantidad del producto actualizada correctamente." });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto:", error);
    return res.status(500).send("Error al actualizar la cantidad del producto");
  }
});

 
module.exports = router;
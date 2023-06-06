const express = require("express");

const ProductManagerMongoose = require("../dao/controllers/productManager.js");
const productManagerMongoose = new ProductManagerMongoose();

const CartManagerMongoose = require("../dao/controllers/cartsManager.js");
const cartsManagerMongoose = new CartManagerMongoose();

const router = express.Router();

router.get("/realTimeProducts", async (req, res) => {
  try {

    const products = await productManagerMongoose.getProducts();
    res.render("realTimeProducts", { products });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/chat", (req, res) => {
  try {

    res.render("chat");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
})

router.get("/products", async (req, res) => {
  try {

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    
    const products = await productManagerMongoose.getPaginatedProducts(page, limit);
    res.render("productList", { products });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productManagerMongoose.getProductById(productId);
    res.render("productDetails", { product });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await cartsManagerMongoose.getCartWithProductsById(cartId);

    if (!cart) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }

    const cartJSON = cart.toJSON();

    res.render("cartDetails", { cart: cartJSON });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


module.exports = router;

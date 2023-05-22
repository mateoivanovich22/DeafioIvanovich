const express = require("express");

const ProductManagerMongoose = require("../dao/controllers/productManager.js");
const productManagerMongoose = new ProductManagerMongoose();

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

module.exports = router;

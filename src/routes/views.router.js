const express = require("express");
const productsRouter = require("../routes/products.router");
const loadProductsFromFile = productsRouter.loadProductsFromFile;

const router = express.Router();

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await loadProductsFromFile("products");
    // res.setHeader("Content-Type", "application/json");
    res.render("realTimeProducts", { products });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;

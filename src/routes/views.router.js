const express = require("express");

const ProductManagerMongoose = require("../dao/controllers/productManager.js");
const productManagerMongoose = new ProductManagerMongoose();

const CartManagerMongoose = require("../dao/controllers/cartsManager.js");
const cartsManagerMongoose = new CartManagerMongoose();

const router = express.Router();

const UserModel = require("../dao/models/users.js");

const privateRoute = (req, res, next) => {
  const user = req.session.user;
  if (user && user.role === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
};

const publicRoute = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/profile");
  }
};

router.get("/", publicRoute, (req, res) => {
  res.render("register", { title: "Express" });
});

router.post("/register", publicRoute, async (req, res) => {
  const { firstname, lastname, email, age, password } = req.body;

  const userEx = await UserModel.findOne({ email });
  if (userEx) {
    console.error("Error, el usuario ya esta registrado");
    res.redirect("/");
  }

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    role = "admin";
  }else{
    role = "usuario";
  }

  try {
    const user = new UserModel({ firstname, lastname, email, age, password, role });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.redirect("/");
  }
});

router.get("/login", publicRoute, (req, res) => {
  res.render("login");
});

router.post("/login", publicRoute, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      res.redirect("/login");
    } else {
     
      req.session.user = user;
      res.redirect("/api/products");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.redirect("/login");
  }
});

router.get("/profile", privateRoute, (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const { firstname, lastname, email, age } = req.session.user;
    res.render("profile", { firstname, lastname, email, age });
  }
});

router.get("/logout", privateRoute, (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

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
});

router.get("/products", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const products = await productManagerMongoose.getPaginatedProducts(
      page,
      limit
    );
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

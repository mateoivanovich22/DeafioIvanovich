const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const ProductManagerMongoose = require("./dao/controllers/productManager.js")
const productManagerMongoose = new ProductManagerMongoose();

const CartsManagerMongoose = require("./dao/controllers/cartsManager.js")
const cartsManagerMongoose = new CartsManagerMongoose();

const MessagesManager = require("./dao/controllers/messagesManager.js");
const messagesManager = new MessagesManager();

let productsOfMongoose = [];

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

const app = express();
const server = app.listen(8080, () => console.log("Listening on port 8080"));
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productsRouter);

app.use("/api/carts/", cartsRouter);

const getProducts = async () => {
  try {
    productsOfMongoose = await productManagerMongoose.getProducts();
    return productsOfMongoose;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};

const createCart = async (productId) => {
  const product = await productManagerMongoose.getProductById(productId);

  if (!product) {
    return res.status(404).send('El producto no existe.');
  }


  const cart = {
    products: [
      {
        product: product.title,
        quantity: 1,
      },
    ],
  };

  const createdCart = await cartsManagerMongoose.createCart(cart);
  console.log("Carrito creado:", createdCart);

  return createdCart;
}

io.on("connection", async(socket) => {
  console.log("Connected to io server");

  await getProducts()
  socket.emit("products", productsOfMongoose);

  socket.on("messageCreated", async(message) =>{
    await messagesManager.createMessage(message);
  })

  socket.on("cartCreated", async( productId ) =>{
    
    const newCart = await createCart(productId);
    socket.emit("cartId", newCart._id);
  })

  socket.on("productCreated",async (product) => {
    await productManagerMongoose.createProduct(product);
    await getProducts();
    io.emit("products", productsOfMongoose);
  });

  socket.on("deleteProduct",async (productId) => {
    await productManagerMongoose.deleteProduct(productId);
    await getProducts();
    io.emit("products", productsOfMongoose);
  });
});

app.use("/", viewsRouter);

const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const fs = require("fs");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

const app = express();
const server = app.listen(8080, () => console.log("Listening"));
const io = new Server(server);
const logs = [];

const loadProductsFromFile = productsRouter.loadProductsFromFile;
let products = [];

async function main() {
  products = await loadProductsFromFile("products");
}

main();

function saveProducts() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Products saved to file");
    }
  });
}

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productsRouter);

app.use("/api/carts/", cartsRouter);

io.on("connection", (socket) => {
  console.log("Connected");
  socket.emit("products", products);

  socket.on("productCreated", (product) => {
    const lastProduct = products.slice(-1)[0];
    const newProductId = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { ...product, id: newProductId };
    products.push(newProduct);
    io.emit("products", products);
    saveProducts();
  });

  socket.on("deleteProduct", (productId) => {
    productId = parseInt(productId);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      io.emit("products", products);
    }
    saveProducts();
  });

  socket.on("message1", (data) => {
    io.emit("log", data);
  });

  socket.on("message2", (data) => {
    logs.push({ socketid: socket.id, message: data });
    io.emit("log", { logs });
  });
});

app.use("/", viewsRouter);

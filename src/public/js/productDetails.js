const socket = io();

function addToCart(productId) {

  try {
    socket.emit("cartCreated", productId);

    socket.on("cartId", (cartId) => {
      window.location.href = `/carts/${cartId}`;
    });
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
}

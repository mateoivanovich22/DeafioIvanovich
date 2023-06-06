const socket = io();

const form = document.getElementById("message-form");
form.addEventListener("submit", fromSubmit);

async function fromSubmit(event) {
  event.preventDefault();

  const userInput = document.getElementById("user-input").value;
  const messageInput = document.getElementById("message-input").value;

  const message = {
    email: userInput,
    message: messageInput,
  };

  document.getElementById("user-input").value = "";
  document.getElementById("message-input").value = "";

  socket.emit("messageCreated", message);

}

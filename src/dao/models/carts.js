const mongoose = require("mongoose");

const db = require("./db.js");

const collection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      default: 0,
    },
  },
});

cartsSchema.statics.createCart = async function (cart) {
  try {
    const newCart = new this(cart);
    const result = await newCart.save();
    return result;
  } catch (error) {
    console.error("Error al crear carrito:", error);
    throw error;
  }
};

const cartsModel = db.model(collection, cartsSchema);

module.exports = cartsModel;

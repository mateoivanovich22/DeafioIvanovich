const cartsModel = require("../models/carts.js");
const { ObjectId } = require('mongoose').Types;

class CartManager {
  constructor() {}

  async createCart(cart) {
    let result = await cartsModel.create(cart);

    return result;
  }

  async getCarts() {
    try {
      const carts = await cartsModel.find({}).lean();
      return carts;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(new ObjectId(id)).lean();

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito por ID:", error);
      throw error;
    }
  }
}

module.exports = CartManager;

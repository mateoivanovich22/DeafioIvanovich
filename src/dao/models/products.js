const mongoose = require("mongoose") ;

const mongoosePaginate =require('mongoose-paginate-v2') ;

const db = require("./db.js") ;

const collection = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    required: true,
  },
});

productsSchema.statics.createProduct = async function (product) {
  try {
    const newProduct = new this(product);
    const result = await newProduct.save();
    return result;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

productsSchema.plugin(mongoosePaginate);
const productsModel = db.model(collection, productsSchema);

module.exports =productsModel;
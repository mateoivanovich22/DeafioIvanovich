const mongoose =require("mongoose") ;

const db =require("./db.js") ;

const collection = "messages";

const messagesSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
  }
});

messagesSchema.statics.createProduct = async function (message) {
  try {
    const newMessage = new this(message);
    const result = await newMessage.save();
    return result;
  } catch (error) {
    console.error("Error al crear carrito:", error);
    throw error;
  }
};

const cartsModel = db.model(collection, messagesSchema);

module.exports =cartsModel;
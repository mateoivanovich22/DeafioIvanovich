const mongoose = require('mongoose') ;

mongoose.connect(`mongodb+srv://mateoivanovich43:mateo@cluster0.c6wntnx.mongodb.net/?retryWrites=true&w=majority`,{
    dbName: 'ecommerce', 
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error to connect MongoDB:'));
db.once('open', () => {
  console.log('Connection succesfully to  MongoDB');
});

module.exports =db;
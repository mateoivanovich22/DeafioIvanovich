const fs = require("fs");

class ProductManager {
  constructor(ruta) {
    this.filePath = ruta;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      //console.log(JSON.parse(data));
      return JSON.parse(data)
    } catch (error) {
      console.error("Error leyendo el archivo:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);
  
      if (product) {
        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error leyendo el archivo:', error);
      return null;
    }
  }

  async addProduct(newProduct) {
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock
    ) {
      console.error("Error al agregar el producto, falta un campo");
    } else {
      try {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        const products = JSON.parse(data);
        const productExists = products.find(
          (product) => product.code === newProduct.code
        );
        if (productExists) {
          console.error(
            `Error al agregar el producto, el código ${newProduct.code} ya existe`
          );
        } else {
          const lastProduct = products[products.length - 1];
          const newId = lastProduct ? lastProduct.id + 1 : 1;
          const productWithId = { ...newProduct, id: newId };
          products.push(productWithId);
          await fs.promises.writeFile(this.filePath, JSON.stringify(products));
          console.log("Producto agregado:", productWithId);
        }
      } catch (error) {
        console.error("Error leyendo el archivo:", error);
      }
    }
  }

  async updateProduct(id, fieldToUpdate) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
      } else {
        if (
          ![
            "title",
            "description",
            "price",
            "thumbnail",
            "stock",
            "code",
          ].includes(fieldToUpdate.field)
        ) {
          console.log(`El campo "${fieldToUpdate.field}" no es válido`);
        } else {
          const updatedProduct = {
            ...products[productIndex],
            [fieldToUpdate.field]: fieldToUpdate.value,
          };

          products[productIndex] = updatedProduct;

          await fs.promises.writeFile(this.filePath, JSON.stringify(products));
          console.log(`Producto con id ${id} modificado`, updatedProduct);
        }
      }
    } catch (error) {
      console.error("Error modificando producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      let products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
      } else {
        const deletedProduct = products[productIndex];
        products.splice(productIndex, 1);

        await fs.promises.writeFile(this.filePath, JSON.stringify(products));
        console.log(`Producto con id ${id} eliminado`, deletedProduct);
      }
    } catch (error) {
      console.error("Error borrando el producto:", error);
    }
  }
}

module.exports = ProductManager;

// EJEMPLO DE PRUEBA
/*
const productManager = new ProductManager("./ejemplo.txt");

const newProduct = {
  title: "jorigto",
  description: "alfajor triple",
  price: 16,
  thumbnail: "jorgi.gif",
  code: 10,
  stock: 5,
};
productManager.getProducts();
productManager.addProduct(newProduct)

const fieldToUpdate = {
  field: "title",
  value: "melva",
};

productManager.updateProduct(3, fieldToUpdate)
productManager.getProductById(6);
*/

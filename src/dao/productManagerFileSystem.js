const fs = require("fs");

class ProductManager {
  constructor(ruta) {
    this.filePath = ruta;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
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
  
  async updateProduct(id, fieldsToUpdate) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
        return;
      }
  
      const updatedProduct = {
        ...products[productIndex],
        ...fieldsToUpdate,
      };
  
      products[productIndex] = updatedProduct;
  
      await fs.promises.writeFile(this.filePath, JSON.stringify(products));
      console.log(`Producto con id ${id} modificado`, updatedProduct);
    } catch (error) {
      console.error("Error modificando producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      let products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === parseInt(id));

      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
        return false;
      } else {
        const deletedProduct = products[productIndex];
        products.splice(productIndex, 1);

        await fs.promises.writeFile(this.filePath, JSON.stringify(products));
        console.log(`Producto con id ${id} eliminado`, deletedProduct);
        return true;
      }
    } catch (error) {
      console.error("Error borrando el producto:", error);
    }
  }
}

module.exports = ProductManager;
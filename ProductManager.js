class ProductManager {

    constructor(){
        this.products = []
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        let realId = false;
        let positionProduct = 0;
        for(let i = 0; i < this.products.length; i++){
            if( id === this.products[i].id){
                realId = true;
                positionProduct = i;
                break;
            }
        }
        if(realId){
            console.log(this.products[positionProduct])
        }else{
            console.error("Not found")
        }
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const id = this.products.length + 1;

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        }

        let codeRepetido = false;

        for(let i = 0; i < this.products.length; i++){
            if( code === this.products[i].code){
                codeRepetido = true;
                break;
            }
        }

        if(!codeRepetido && title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && code !== undefined && stock !== undefined ){    
            this.products.push(product)
        }else{
            console.error("ERROR AL AGREGAR PRODUCTO ALGUN CAMPO ESTA MAL")
        }
    
    }
}

// EJEMPLO DE PRUEBA
/*
const productManager = new ProductManager()

productManager.addProduct("Oreos", "Galletitas blancas y negras", 25, "asdcfg.gif", 355, 5);
productManager.addProduct("Milka", "Chocolate blanco", 15, "ddddg.gif", 200, 6)
productManager.getProducts();
productManager.getProductById(6);
productManager.getProductById(2);
*/
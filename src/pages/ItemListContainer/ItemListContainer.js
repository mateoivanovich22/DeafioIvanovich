import { useEffect, useState } from "react";
import { products } from "../../data/products"
import ItemList from "../../Components/ItemList/ItemList"

const ItemListContainer = ({greeting}) => {
    
    const [productList, setProductList] = useState([])

    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 3000)
    });

    useEffect(() => {
        getProducts
        .then((response) => {
            setProductList(response)
        })
        .catch((err) => {console.log(err)});
    },) //SI LE SACO EL "[]" SE ARREGLA EL WARNING

  return <div>
    <h1 style={{padding:"30px", textDecoration:"underline"}}>Zapatillas</h1>
    <ItemList productList={productList}/>
  </div>

}

export default ItemListContainer;
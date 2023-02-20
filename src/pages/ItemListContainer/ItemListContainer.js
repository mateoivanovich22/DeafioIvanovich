import { useEffect, useState } from "react";
import { products } from "../../data/products"
import ItemList from "../../Components/ItemList/ItemList"
import { useParams } from "react-router-dom";

const ItemListContainer = ({section}) => {
    
    const [productList, setProductList] = useState([])

    const {categoryId} = useParams();

    const getProducts = new Promise((resolve, reject) => {
        if(categoryId){
            const filteredProducts = products.filter((item) => item.category === categoryId);
            setTimeout(() => {
                resolve(filteredProducts)
            }, 1000)
        }else{
            setTimeout(() => {
                resolve(products)
            }, 1000)
        }
    });

    useEffect(() => {
        getProducts
        .then((response) => {
            setProductList(response)
        })
        .catch((err) => {console.log(err)});
    }, [categoryId])

  return <div>
    <h1 style={{padding:"30px", textDecoration:"underline", marginTop: "60px"}}>{section}</h1>
    <ItemList productList={productList}/>
  </div>

}

export default ItemListContainer;
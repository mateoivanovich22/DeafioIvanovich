import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useEffect, useState } from "react";
import ItemDetail from "../../Components/ItemDetail/ItemDetail";
import "./style.css"

const ItemDetailContainer = () => {
  const {id} = useParams();
  const [detailObject, setDetailObject] = useState({});

  const getProduct = new Promise((resolve, reject) => {
    setTimeout(() => {
      const findProducts = products.find( item => item.id === id)
      resolve(findProducts)
    }, 1000)
  });

  useEffect(() => {
    getProduct
    .then(response => {
      setDetailObject(response)
    })
    .catch((error) => {console.log(error)});
  },)

  return (
    <div className="itemDetail">
      <ItemDetail detail={detailObject} />

    </div>
  )
}

export default ItemDetailContainer;

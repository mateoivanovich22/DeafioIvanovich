import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../../Components/ItemDetail/ItemDetail";
import "./style.css"
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const {id} = useParams();
  const [detailObject, setDetailObject] = useState({});

  const getProduct = () => {
    const db = getFirestore();
    const querySnapshot = doc(db, 'products', id);

    getDoc(querySnapshot)
    .then((response) => {
      response.data()
      setDetailObject({
        id: response.id, 
        ...response.data()
      })
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getProduct();
  },)

  return (
    <div className="itemDetail">
      <ItemDetail detail={detailObject} />
    </div>
  )
}

export default ItemDetailContainer;

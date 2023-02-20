import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./style.css"
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ItemDetail = ({detail}) => {

  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const agregarAlCarrito = (event) => {
    event.preventDefault();
  }

  return (
    <div className="detail">
      <div className="detailHijo" >
        <img alt="imagen de producto" src={detail.image} width="200px"/>
        <h2>{detail.name}</h2>
        <h3>{detail.price}</h3>
        <ItemCount count={count} setCount={setCount}/>
        <Button onClick={() => agregarAlCarrito} variant="outline-secondary">Agregar al carrito</Button>{' '}
      </div>
      <div className="detailNav">
        <div className="detailNavHijo" > 
          <Button onClick={() => navigate('/allclothes')} variant="secondary" >Seguir comprando</Button>{' '}
        </div>
        <div className="detailNavHijo">
          <Button onClick={() => navigate('/cart')} variant="secondary">Completar mi compra</Button>{' '}
        </div>
      </div>
      
    </div>
  )
}
export default ItemDetail;

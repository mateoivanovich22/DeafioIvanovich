import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./style.css"
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ItemDetail = ({detail}) => {

  const navigate = useNavigate();

  const [count, setCount] = useState(1);

  const agregarAlCarrito = (event) => {
    event.preventDefault();
  }
  return (
    <div className="detailContainer">
      <div className="detail">

        <div>
          <h2 className="tituloZapa">{detail.name}</h2>
        </div>
        <div className="detailAbuelo">
          <div className="detailPadre" >
            {/* HACER IMAGEN ALTERNA */}
            <img alt="imagen de producto" src={detail.image} width="500px"/>
          </div>
          <div className="detailHijo">
            
            <p>{detail.description}</p>
            <h3 style={{color:"red"}}>{detail.price}</h3>
            <ItemCount count={count} setCount={setCount}/>
            <Button onClick={() => agregarAlCarrito} variant="outline-secondary">Agregar al carrito</Button>{' '}
          </div>
        </div>
        
      </div>
      <div>
        <div className="detailNav">
            <div className="detailNavHijo" > 
              <Button onClick={() => navigate('/allclothes')} variant="secondary" >Seguir comprando</Button>{' '}
            </div>
            <div className="detailNavHijo">
              <Button onClick={() => navigate('/cart')} variant="secondary">Completar mi compra</Button>{' '}
            </div>
          </div>
      </div>
    </div>

  )
}
export default ItemDetail;

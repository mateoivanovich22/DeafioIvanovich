import { useState, useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./style.css"
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {CartContext} from "../../context/CartContext";

const ItemDetail = ({detail}) => {

  const navigate = useNavigate();
  const {addItem} = useContext(CartContext)

  const [count, setCount] = useState(detail?.stock === 0 ? 0 : 1);

  const [cargarLoad, setCargarLoad] = useState("noCarga")
  const [cargarBoton, setCargarBoton] = useState("botonRaro")

  return (
    <div className="detailContainer"> 
      <div className="detail">

        <div>
          <h2 className="tituloZapa">{detail.name}</h2>
        </div>
        <div className="detailAbuelo">
          <div className="detailPadre" >
            <img alt="imagen de producto" src={`/img/${detail.image}`} width="500px"/>
          </div>
          <div className="detailHijo">          
            <p>{detail.description}</p>
            <h3 style={{color:"red"}}>{detail.price}$</h3>
            <h4>stock: {detail.stock}</h4>
            <ItemCount count={count} setCount={setCount}/>
            <div className="divBotonLoad" >
              <button className={cargarBoton} disabled={count > detail.stock ? true : false} onClick={() => {
                setCargarLoad("lds-spinner")
                setCargarBoton("noCarga")
                setTimeout(() => {
                  setCargarBoton("botonRaro")
                  setCargarLoad("noCarga")
                  addItem(detail ,count)
                }, 2000)
              }}>Add to cart</button>

              <div className={cargarLoad}>
                <div className="loader">
                  <div className="loader-inner">
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                    <div className="loader-block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div>
        <div className="detailNav">
            <div className="detailNavHijo" > 
              <Button style={{width:"200px"}} onClick={() => navigate('/allclothes')} variant="secondary" >Continue shopping</Button>{' '}
            </div>
            <div className="detailNavHijo">
              <Button style={{width:"200px"}} onClick={() => navigate('/cart')} variant="secondary">Go to cart</Button>{' '}
            </div>
          </div>
      </div>
    </div>

  )
}
export default ItemDetail;

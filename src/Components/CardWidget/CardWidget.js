import "./style.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CardWidget() {
  const { cart } = useContext(CartContext);
  return (
    <div className="divCardWidget">
      <img src={"/img/carrito.png"} alt="imagen carrito" />
      <p>{cart?.length}</p>
    </div>
  );
}

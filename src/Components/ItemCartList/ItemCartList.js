import ItemCart from "../ItemCart/ItemCart";
import "./style.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "react-bootstrap/Button";

const ItemCartList = () => {
  const { cart, removeItem } = useContext(CartContext);
  return (
    <div className="itemListCart">
      {cart.map((item) => (
        <div key={item.id}>
          <ItemCart product={item} />
          <Button onClick={() => removeItem(item.id)} variant="outline-danger">
            X
          </Button>{" "}
        </div>
      ))}
    </div>
  );
};

export default ItemCartList;

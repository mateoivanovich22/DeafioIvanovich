import "./style.css";
import Card from "react-bootstrap/Card";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ItemCart = ({ product }) => {
  const { updateItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    updateItem(product.id, quantity);
  }, [quantity]);

  return (
    <Card style={{ width: "17rem", height: "46 9px", margin: "25px" }}>
      <Card.Img variant="top" src={`/img/${product.image}`} />
      <Card.Body className="cardBody">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: {product.price * product.quantity}$</Card.Text>
        <Card.Text>Max units: {product.stock}</Card.Text>
        <ItemCount
          className="itemCountCart"
          count={quantity}
          setCount={setQuantity}
        />
      </Card.Body>
    </Card>
  );
};

export default ItemCart;

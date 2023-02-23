import "./style.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({product}) => {
  return (
   <div className="itemContainer">
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.price}
          </Card.Text>
        </Card.Body>
      </Card>
      <Link style={{padding:"10px"}} to={`/item/${product.id}`}>
        <Button variant="primary">
          Buy
        </Button>
      </Link>
   </div>
  )
}

export default Item;
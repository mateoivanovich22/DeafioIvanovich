import "./style.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const ItemCount = ({ count, setCount }) => {
  const onAdd = () => {
    setCount(count + 1);
  };

  const restar = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <div className="hijoCounter">
        <ButtonGroup>
          <Button disabled={count === 0} onClick={restar} variant="secondary">
            -
          </Button>
          <Button variant="secondary" disabled>
            {count}
          </Button>
          <Button disabled={count === 0} onClick={onAdd} variant="secondary">
            +
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ItemCount;

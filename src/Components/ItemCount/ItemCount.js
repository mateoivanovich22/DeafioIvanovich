import "./style.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ItemCount = ({ count, setCount}) => {

    const onAdd = () => {
        setCount(count + 1);
    }

    const restar = () => {
        if(count === 0){
            return;
        }
        setCount(count - 1);
    }
  return (
    <div className="counter">

        <h2>Agregar.</h2>
        <div className="hijoCounter">
            <ButtonGroup >
                <Button onClick={restar} variant="secondary">-</Button>
                <Button variant="secondary" disabled>{count}</Button>
                <Button onClick={onAdd} variant="secondary">+</Button>
            </ButtonGroup>
        </div>
    </div>
  )
}

export default ItemCount
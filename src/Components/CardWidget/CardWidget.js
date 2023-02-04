import logo from '../../assets/img/carrito.png';
import './style.css';

export default function CardWidget({cantidadCarrito}) {
    return (
        <div className='divCardWidget'>
            <img src={logo} alt="imagen carrito" />
            <p>{cantidadCarrito}</p>
        </div>
    )
}
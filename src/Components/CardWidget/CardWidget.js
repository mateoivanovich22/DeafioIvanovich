import logo from '../../assets/img/carrito.png';
import './style.css';

export default function CardWidget({cantidadCarrito}) {
    return (
        <div className='divCardWidget'>
            <img className='imgLogo' src={logo} alt="imagen carrito" />
            <p className='cantidad'>{cantidadCarrito}</p>
        </div>
    )
}
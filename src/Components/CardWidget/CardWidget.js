import './style.css';

export default function CardWidget({cantidadCarrito}) {
    return (
        <div className='divCardWidget'>
            <img src={'/img/carrito.png'} alt="imagen carrito" />
            <p>{cantidadCarrito}</p>
        </div>
    )
}
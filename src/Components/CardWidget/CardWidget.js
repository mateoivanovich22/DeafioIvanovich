
export default function CardWidget({cantidadCarrito}) {
    return (
        <div>
            <img src="./img/carrito.png" alt="imagen carrito"/>
            <p>{cantidadCarrito}</p>
        </div>
    )
}
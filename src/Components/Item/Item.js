import "./style.css";

const Item = ({product}) => {
  return (
    <div className="item">
      <img alt={product.name} src={product.image} width="200px"/>
      <h2>{product.name}</h2>
      <h3>{product.description}</h3>
      <h4>{product.price}</h4>
      <div style={{display:"flex", justifyContent:"center"}}>
        <button>-</button>
        <button type="button" style={{borderColor:"grey", padding:"5px", color:"black"}} disabled>Cantidad</button>
        <button>+</button>
      </div>
      
    </div>
  )
}

export default Item;
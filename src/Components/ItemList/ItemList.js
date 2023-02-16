import Item from "../Item/Item";
import "./style.css"

const ItemList = ({productList}) => {
  console.log(productList)
  return (
    <div className="itemList">
      {
        productList.map((product) => (
          <div key={product.id}> {/* HAY QUE PONER SIEMPRE LA KEY EN EL ELEMENTO PADRE DEL MAP*/}
            <Item product={product} />
          </div>
        ))
      }
    </div>
  )
}

export default ItemList;
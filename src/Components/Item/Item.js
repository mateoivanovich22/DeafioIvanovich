import "./style.css";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="book">
      <div>
        <h2>Stock: {product.stock}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: " space-evenly",
            padding: "3px",
          }}
        >
          <h2>Price: </h2>
          <h2 style={{ color: "red", marginBottom: "100px" }}>
            {product.price}$
          </h2>
        </div>

        <Link style={{ padding: "10px" }} to={`/item/${product.id}`}>
          <div className="fancy">
            <span className="top-key"></span>
            <span className="text">More Info</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </div>
        </Link>
      </div>

      <div className="cover">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "60px", fontFamily: "-moz-initial" }}>
            <h3>{product.name}</h3>
          </div>
          <img
            alt="imagen zapa"
            src={`/img/${product.image}`}
            width="250px"
            height="250px"
          />
        </div>
      </div>
    </div>
  );
};

export default Item;

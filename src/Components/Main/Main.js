import "./style.css"
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main>
        <div className="imagenSuperior">
          <img src={'/img/modelo2.png'} alt="modelo main" />  
        </div>
        <div className="imagenesInferiores">
          <img alt="modelo 1" src={'/img/modelo1.webp'} width="550px" height={"400px"}/>
          <Link to={"/allclothes"}>
            <button className="cta">
              <span className="hover-underline-animation"> Shop now </span>
              <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                  <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
              </svg>
            </button>
          </Link>
          
          <img alt="modelo 2" src={'/img/modelo3.jpg'} width="550px" height={"400px"}/>
        </div>
    </main>
  )
}

export default Main;


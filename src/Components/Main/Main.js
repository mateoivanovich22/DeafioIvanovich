import "./style.css"

const Main = () => {
  return (
    <main>
        <div className="imagenSuperior">
          <img src={'/img/modelo2.png'} alt="modelo main" />  
        </div>
        <div className="imagenesInferiores">
          <img alt="modelo 1" src={'/img/modelo1.webp'} width="550px" height={"400px"}/>
          <img alt="modelo 2" src={'/img/modelo3.jpg'} width="550px" height={"400px"}/>
        </div>
    </main>
  )
}

export default Main;


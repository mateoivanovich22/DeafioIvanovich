import './App.css';
import NavBar from './Components/NavBar/NavBar';
import background from './assets/img/fondoIndex.jpg';
import fotoMain from './assets/img/modelo2.png';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`}}>
      <header>
        <h1>Naike Shoes.</h1>
        <NavBar/>
      </header>
      <main>
        <div>
          <img src={fotoMain} alt="modelo main" />
        </div>
      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;

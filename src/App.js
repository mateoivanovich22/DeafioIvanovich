import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';



function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${'./img/fondoIndex.jpg'})`}}>
      <header> 
        <h1 style={{padding:'25px'}}>Naike Shoes.</h1>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/shoes' element={<ItemListContainer/>} />
          </Routes>
        </BrowserRouter>
        
      </header>
      <main>
        <div>
          <img src={'./img/modelo2.png'} alt="modelo main" />  
        </div>
        <div>
          {/* <ItemListContainer/> */}
        </div>
      </main>

      <footer>

      </footer>
    </div>
    
  );
}
/*
function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${'./img/fondoIndex.jpg'})`}}>
      <header> 
        <h1 style={{padding:'25px'}}>Naike Shoes.</h1>
        <NavBar/>
      </header>
      <main>
        <div>
          <img src={'./img/modelo2.png'} alt="modelo main" />  
        </div>
        <div>
          <ItemListContainer/>
        </div>
      </main>

      <footer>

      </footer>
    </div>
    
  );
}*/
export default App;

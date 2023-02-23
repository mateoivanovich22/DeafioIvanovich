import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer';
import Cart from './pages/Cart/Cart'

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${'./img/fondoIndex.jpg'})`}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/allclothes' element={<ItemListContainer/>} />
          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/item/:id' element={<ItemDetailContainer/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>  
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}


export default App;

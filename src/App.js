import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer';
import Cart from './pages/Cart/Cart'
import CartProvider from './context/CartProvider';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${'./img/fondoIndex.jpg'})`}}>
      <BrowserRouter>
        <CartProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/allclothes' element={<ItemListContainer/>} />
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='*' element={
              <div>
                <h1>Esta página no existe</h1>
              </div>
            } />
          </Routes>  
          <Footer/>
        </CartProvider>  
      </BrowserRouter>     
    </div>
  );
}


export default App;

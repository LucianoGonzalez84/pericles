import React from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from './storage/CartContext';
import CartView from './components/CartView/CartView';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <div>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={ <ItemListContainer/> }/>
            <Route path='/category/:styleid' element={ <ItemListContainer/> }/>
            <Route path='/detalle/:id' element={ <ItemDetailContainer/> }/>
            <Route path='/cart' element= { <CartView/> }/>
            <Route path='*' element={ <h1>404: Ruta no encontrada</h1> }/>           
          </Routes>
          <Footer></Footer>
        </BrowserRouter>  
      </CartContextProvider> 
    </div>
  );
}

export default App;

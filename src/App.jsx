import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainLayout from './layout/MainLayout.jsx';
import Details from './pages/Details.jsx';
import Cart from './pages/Cart.jsx'; 
import Products from './pages/Product.jsx';
import Abaut from './pages/Abaut.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<MainLayout><Home /></MainLayout>} />
        <Route path='/Abaut' element={<MainLayout><Abaut /></MainLayout>} />
        <Route path='/Cart' element={<MainLayout><Cart /></MainLayout>} />
        <Route path='/products/:id' element={<MainLayout><Details /></MainLayout>} />
        <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
      </Routes>
    </div>
  );
}

export default App;

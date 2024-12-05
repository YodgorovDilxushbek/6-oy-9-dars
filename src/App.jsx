import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainLayout from './layout/MainLayout.jsx';
import Details from "./pages/Details.jsx"
import Products from "./pages/Product.jsx";


function App() {
  return (
    <div className="">
      <Routes>
        <Route index element={<MainLayout><Home></Home></MainLayout>}></Route>
        <Route path='/products/:Did' element={<MainLayout><Details></Details></MainLayout>}></Route>

        <Route path='/products' element={<MainLayout><Products></Products></MainLayout>}></Route>
      </Routes>
    </div>
  );
}

export default App;

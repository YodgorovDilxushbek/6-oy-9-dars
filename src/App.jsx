import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Details from './pages/Details'
import Cart from './pages/Cart'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'
function App() {
  return (
    <div>
      <header>
        <Header>
          <Link to='/'></Link>
          <Link to='/Product'></Link>
          <Link to='/Cart'></Link>
          <Link to='*'></Link>
        </Header>
      </header>
      <Routes>
        <Route path='/' element = {<Home></Home>}></Route>
        <Route path='/Product' element = {<Product></Product>}></Route>
        <Route path='/Details/:id' element = {<Details></Details>}></Route>
        <Route path='/Cart' element = {<Cart></Cart>}></Route>
        <Route path='*' element = {<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  )
}

export default App

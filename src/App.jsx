import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import DetailsProduct from './Components/DetailsProduct/DetailsProduct'
import { CartProvider } from './Components/CartContext/CartContext'
import Cart from './Components/Cart/Cart'
import AcercaDe from './Components/AcercaDe/AcercaDe'
import Contacto from './Components/Contacto/Contacto'
import { useEffect, useState } from 'react'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Inicio from './Components/Inicio/Inicio'
import Login from './Components/Login/Login'
import Admin from './Components/Admin/Admin'
import FormularioProducto from './Components/FormularioProducto/FormularioProducto'
import FormularioEdicion from './Components/FormularioEdicion/FormularioEdicion'
import { ProductosProvider } from './Components/Contexts/ProductosContext'
import { useAuthContext } from './Components/Contexts/AuthContext'
import CollapsibleExample from './Components/NavbarBootstrap/NavbarBootstrap'


function App() {

  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])

  return (
    <>
      <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element = { <Inicio/> }/>
        {/* <Route path="/inicio" element = { <Inicio/> }/> */}
        <Route path="/home" element = { <Home/> }/>
        <Route path="/acercade" element = { <AcercaDe/> }/>
        <Route path="/contacto" element = { <Contacto/> }/>
        <Route path="/login" element = { <Login />}/>
        <Route path="/admin" element = { <Admin />}/>
        <Route path="/producto/:id" element = { <DetailsProduct/> }/>
        <Route path="/carrito" element = { <Cart /> }/>
        <Route path="/admin/agregarProducto" element={ <FormularioProducto /> }/>
        <Route path="/admin/editarProducto/:id" element={ <FormularioEdicion /> }/>
        </Routes>
      </Router>
      </CartProvider>
    </>
  )
}

export default App;

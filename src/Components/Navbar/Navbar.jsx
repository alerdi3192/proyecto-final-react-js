import "./Navbar.css"
import { useCart } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { useAuthContext } from "../Contexts/AuthContext";
import { FaBars } from "react-icons/fa";
import { useState } from "react";


const Navbar = (/*{user}*/) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

    const {carrito} = useCart();
    const {user, admin} = useAuthContext();

    const totalProductos = carrito.reduce((acc, producto) =>
        acc + producto.cantidad, 0)

    return (
        <section className="header">

            <h1 className="logo">ALERDI<span>ecom</span></h1>

            <nav className={isOpen? "navbar active" : "navbar"}>
                
                <ul className="nav-links">
                    <li><Link to = "/" >Inicio</Link></li>
                    <li><Link to = "/home" className="active">Home</Link></li>
                    <li><Link to = "/acercade" >Acerca de</Link></li>
                    <li><Link to = "/contacto">Contacto</Link></li>
                    {admin? <li><Link to = "/admin/agregarProducto">Agregar Producto</Link></li> : <></> }
                    {/*<li><Link to = "/navbar2">CollapsibleExample</Link></li>*/}
                </ul>
                
                <ul className="nav-admin-login">
                    {admin? <li><Link to = "/admin">Admin</Link></li> : <></> }
                    <li><Link to = "/login">Login</Link></li>                    
                </ul>
            
                <div className="icons">
                    <Link to="/carrito" className="icon-button">
                        <i className="fas fa-shopping-cart"></i>
                        {totalProductos > 0 ? <span className="counter">{totalProductos}</span> : <></>}
                    </Link>
                </div>
            </nav>
            <div className="icon" onClick={toggleMenu}>
                <FaBars />
            </div>
        </section>

        
    );
}

export default Navbar;
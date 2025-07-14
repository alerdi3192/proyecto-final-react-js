import "./Cart.css"
import { useCart } from "../CartContext/CartContext";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import Producto from "../BotonCompra/BotonCompra";


const Cart = () => {

    const {user} = useAuthContext();

    const {carrito, actualizarCantidad, eliminarProducto} = useCart();

    const costoDeEnvio = 0;

    const subTotal = carrito.reduce((acc, producto) => 
        acc + producto.precio * producto.cantidad, 0)

    const total = subTotal + costoDeEnvio

    const handleAumentarCantidad = (productoId) => {
        actualizarCantidad(productoId, 1)
    }

    const handleDisminuirCantidad = (productoId) => {
        const producto = carrito.find((item) => item.id === productoId)
        if (producto.cantidad > 1) {
            actualizarCantidad(productoId, -1)
        }
    }

    
    if (!user) {
        return (
            <Navigate to="/home" replace />
        )
    }
    
    return(
        <div className="cart-container">
            <h2>TU<span>CARRITO</span></h2>
            { carrito.length === 0 ? (
                <p>Tu carrito está vacio</p>
            ) : (
                <>
                <div className="cart-header">
                    <p>Producto</p>
                    <p>Precio</p>
                    <p>Cantidad</p>
                    <p>Total</p>
                    <p>Eliminar</p>
                </div>
                <ul className="cart-items">
                    {
                        carrito.map((producto) => {
                            const totalPrecio = producto.precio * producto.cantidad
                            return(
                                <li className="cart-item" key={producto.id}>
                                    <div className="product-info">
                                        <img src={producto.imagen} alt="imagen" className="product-images" />
                                        <span>{producto.nombre}</span>
                                    </div>
                                    <p>${producto.precio}</p>
                                    <div className="quantity-controls">
                                        <button className="quantity-btn"
                                        onClick={() => handleDisminuirCantidad(producto.id) }>-</button>
                                        <input type="number" className="quantity-input" readOnly value={producto.cantidad} />
                                        <button className="quantity-btn"
                                        onClick={() => handleAumentarCantidad(producto.id)}>+</button>
                                    </div>
                                    <p>${totalPrecio}</p>
                                    <button className="delete-btn"
                                    onClick={() => eliminarProducto(producto.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                </>
            )
            }

            <div className="cart-summary">
                <h2>TU<span>CARRITO</span></h2>
                <p>Total parcial: <span>$ {subTotal}</span></p>
                <p>Tarifa de envío: <span>$ {costoDeEnvio}</span></p>
                <p className="total">Total: <span>$ {total}</span></p>
                <div className="check-out">
                    <Producto texto="PAGAR"></Producto>
                </div>
            </div>

        </div>

    );
}

export default Cart;
import "./DetailsProduct.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { useProductosContext } from "../Contexts/ProductosContext";
import Producto from "../BotonCompra/BotonCompra";
import { SwalBasico } from "../../assets/SweetAlert";


const DetailsProduct = () => {

    const navegar = useNavigate();

    const {admin} = useAuthContext();
    const {id} = useParams()
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null)
    const {agregarAlCarrito} = useCart();
    const {productoEncontrado, obtenerProducto, eliminarProducto} = useProductosContext();

    const handleAgregarAlCarrito = () => {
        if (productoEncontrado) {
            agregarAlCarrito({
                id: productoEncontrado.id,
                imagen: productoEncontrado.image,
                nombre: productoEncontrado.name,
                descripcion: productoEncontrado.descripcion,
                precio: productoEncontrado.precio,
                cantidad: 1,
            })
            SwalBasico('Agregar al Carrito', 'Producto agregado', 'success', 'Cerrar')

        }
    }


    useEffect(() => {
        obtenerProducto(id).then(() => {
            setCargando(false);
        }).catch((error) => {
            if(error == "Producto no encontrado") {
                setError("Producto no encontrado")
            }
            if(error == "Hubo un error al obtener el producto") {
                setError("Hubo un error al obtener el producto")
            }
            setCargando(false);
        })       
    }, [id])


    if (error) {
        return <h2 className="error-message">{error}</h2>       
    }

    function dispararEliminar () {
        eliminarProducto(id).then(() => {
            navegar("/home")
        }).catch((error) => {
            alert("Hubo un problema al eliminar el producto")
        })
    }

   return (
        <div className="detalles">

        <div className="product-details">
            {
                productoEncontrado ? (
                    <>
                    <img src={productoEncontrado.imagen} alt={productoEncontrado.name} className="image-small"/>
                    <img src={productoEncontrado.imagen} alt={productoEncontrado.name} />
                    <div className="products-infos">
                        <h1>{productoEncontrado.name}</h1>
                        <p className="price">${productoEncontrado.precio}</p>
                        <p className="description">{productoEncontrado.descripcion}</p>                        
                        {admin? <Link to={"/admin/editarProducto/" + id}><button className="btn-edit">Editar Producto</button></Link> : <button className="add-to-cart" onClick={handleAgregarAlCarrito}>Añadir al carrito</button>}
                        {admin? <button className="btn-delete" onClick={dispararEliminar}>Eliminar Producto</button> : <></>}
                        <p className="note">
                            Producto 100% original.<br/>Pago contrareembolso disponible.<br/>Política de devolución y cambio fácil dentro de los 7 días.
                        </p>
                    </div>
                    </>
                ) : (
                    <p>Cargando producto ...</p>
                )
            }
        </div>
        </div>
   );
}

export default DetailsProduct;
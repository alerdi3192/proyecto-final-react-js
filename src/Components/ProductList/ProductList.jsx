import "./ProductList.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductosContext } from "../Contexts/ProductosContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { Col, Row } from "react-bootstrap";


const ProductList = ({}) => {

    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();

    const productosPorPagina = 3;
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate()

    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError("Hubo un error al cargar los productos");
            setCargando(false);
        })
    }, []);}

    useEffect(() => {
        filtrarProductos(filtro)
    }, [filtro])

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
        
    const handleImageClick = (id) => {
        navigate (`/producto/${id}`);
    }

    if(cargando) {
        return <p>Cargando productos ... </p>
    } else if(error) {
        return <p>{error}</p>
    } else {
        return (
            <>
            <input
                type="text"
                placeholder="Buscar productos"
                className="form-control my-2"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            
            <section className="container main-content">
                
                <Row xs={1} md={2} lg={3} className="g-4">
                    {productosActuales.length >0 ? productosActuales.map((producto) => (
                        <Col>
                            <div className="product-card" key={producto.id}>
                                <img 
                                    src={producto.imagen}
                                    alt={producto.name}
                                    className="product-image"
                                    onClick={() => handleImageClick(producto.id)}
                                />
                                <h3>{producto.name}</h3>
                                {/*<p>{producto.descripcion}</p>*/}
                                <p>${producto.precio}</p>
                            </div>
                        </Col>)) : <></>
                    }
                </Row>
                <div className="d-flex justify-content-center my-4">
                    {Array.from({length: totalPaginas}, (_, index) => (
                        <button 
                            key={index +1} 
                            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                        {index + 1}
                        </button>
                    ))}

                </div>

            </section>

            </>
        );
    }
}

export default ProductList;
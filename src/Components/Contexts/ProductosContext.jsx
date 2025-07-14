import React, { createContext, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Crear el contexto de los productos
const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState([])

    function obtenerProductos() {
        return(
            new Promise((res, rej) => {
                fetch('https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles')
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        console.log(datos)
                        setProductos(datos)
                        setProductosOriginales(datos)
                        res(datos)
                    })
                    .catch((error) => {
                        console.log("Error", error)
                        rej(error)
                    })
                ;
            })
        )
    }

    const agregarProducto = (producto) => {
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch('https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                        toast.success('Producto agregado correctamente');
                        res(data)
                    } catch (error) {
                        alert('Hubo un problema al agregar el producto.');
                        rej(error.message)
                    }
                    <ToastContainer/>    
            }   )
        )
    };

    function obtenerProducto(id) {
        return(
            new Promise((res, rej) => {
               fetch("https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles")
                .then((res) => res.json())
                .then((datos) => {
                    const productoEncontrado = datos.find((item) => item.id === id);
                    if (productoEncontrado) {
                    setProductoEncontrado(productoEncontrado);
                    res(datos)
                    } else {
                        rej("Producto no encontrado")
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
            })
        )
    }

    function editarProducto(producto) {
        return (
            new Promise(async(res,rej) => {
                try {
                    const respuesta = await fetch(`https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles/${producto.id}`, {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al actualizar el producto.');
                    }
                    const data = await respuesta.json();
                    res(data);
                } catch (error) {
                    console.error(error.message);
                    rej(error)
                }
            })
        )

    }

    function eliminarProducto(id) {
        const confirmar = window.confirm('¿Estás seguro de eliminar?')
        if (confirmar) {
            return (
                new Promise (async (res,rej) => {
                try {
                    const respuesta = await fetch(`https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles/${id}`, {
                        method: 'DELETE',
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al eliminar');
                    }
                    alert('Producto eliminado correctamente.');
                    res()
                } catch (error) {
                    console.error(error.message);
                    toast.error('Hubo un problema al eliminar el producto.');
                    rej(error)
                }
                <ToastContainer/>
            })
            )
        }
    }

    function filtrarProductos(filtro) {
        if(filtro.length < 0) {
            setProductos(productosOriginales)
            return;
        }
        const productosFiltrados = productosOriginales.filter((producto) =>
            producto.name.toLowerCase().includes(filtro.toLowerCase())
        );
        setProductos(productosFiltrados)
    }

    return (
        <ProductosContext.Provider value={{ filtrarProductos, obtenerProductos, productos, agregarProducto, obtenerProducto, productoEncontrado, editarProducto, eliminarProducto }}>
        {children}
        </ProductosContext.Provider> 
    );
}
export const useProductosContext = () => useContext(ProductosContext);
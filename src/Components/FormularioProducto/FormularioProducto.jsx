import "./FormularioProducto.css"
import React, { useState } from "react";
import {useAuthContext} from '../Contexts/AuthContext';
import { Navigate } from "react-router-dom";
import { useProductosContext } from "../Contexts/ProductosContext";
import { ToastContainer, toast } from "react-toastify";
import { SwalBasico } from "../../assets/SweetAlert";


function FormularioProducto({}) {

    const {agregarProducto} = useProductosContext();
    const {admin} = useAuthContext();

    const [producto, setProducto] = useState({
        name: '',
        precio: '',
        descripcion: '',
        imagen: '',
    });
    
    const validarFormulario = () => {
        if (!producto.name.trim()) {
            return(
                SwalBasico('Validación', 'El nombre es obligatorio', 'warning', 'Cerrar')
            )
        }
        if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
            return(
                SwalBasico('Validación', 'La descripción debe tener más de diez caracteres', 'warning', 'Cerrar')
            )
        }
        if (!producto.precio || producto.precio <= 0) {
            return(
                SwalBasico('Validación', 'El precio debe ser mayor a 0', 'warning', 'Cerrar')
            )
        }
        if (!producto.imagen.trim()) {
            return(
                SwalBasico('Validación', 'La URL de la imagen no debe estar vacía', 'warning', 'Cerrar')
            )
        }else {
            return true
        }
    };
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProducto({...producto, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario()
        if (validarForm == true) {
            agregarProducto(producto).then((data) => { // Llamada a la función para agregar el producto
            setProducto({name:'', precio:'', descripcion:'', imagen:''}); // Limpiar el formulario
            }).catch ((error) => {
                alert("Hubo un problema al agregar el producto")
            })
        } else {
            alert("Error en la carga del producto")
        }
    }

    return (
        <div className="formprod">
            <div className="d-flex justify-content-center bg-primary-subtle w-50 my-5 mx-3">
                <form className="w-100 p-4 border round shadow" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center bg-primary-subtle">
                        <h2>Agregar Producto</h2>
                    </div>
                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">Nombre:</label>
                        <input className="w-75" type="text" name="name" value={producto.name} onChange={handleChange} required />
                    </div>
                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">Descripción:</label>
                        <input className="w-75" type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} required />
                    </div>

                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">URL de imagen:</label>
                        <input className="w-75" type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
                    </div>

                    
                    <div className="d-flex justify-content-center m-2 w-100">
                        <label className="form-label w-25">Precio:</label>
                        <input className="w-75" type="number" name="precio" value={producto.precio} onChange={handleChange} required />
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <button className="btn btn-primary w-25" type="submit">Agregar</button>
                    </div>
                    <ToastContainer/>
                </form>
            </div>
        </div>
    )
}

export default FormularioProducto;
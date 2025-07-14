import "./FormularioEdicion.css"
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../Contexts/ProductosContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { ToastContainer,toast } from "react-toastify";


function FormularioEdicion() {
  
  const {admin} = useAuthContext();
  const {obtenerProducto, productoEncontrado, editarProducto} = useProductosContext();
  const {id} = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) {
    return (
      <Navigate to="/login" replace />
    )
  }
  
  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
  }).catch((error) => {
    if (error == "Producto no encontrado") {
      setError("Producto no encontrado");
    }
    if (error == "Hubo un error al obtener el producto") {
      setError ("Hubo un error al obtener el producto");
    }
    setCargando(false);
  })
  },[id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return(
        toast.error('El nombre es obligatorio')
      )
    }
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      return(
        toast.error('La descripción debe tener más de diez caracteres')
      )
    }
    if (!producto.precio || producto.precio <= 0) {
      return(
        toast.error('El precio debe ser mayor a 0')
      )
    }
    if (!producto.imagen.trim()) {
      return(
        toast.error('La URL de la imagen no debe estar vacía')
      )
    }
    else {
      return true
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm == true) {
      editarProducto(producto).then((prod) => {
        toast.success("Producto actualizado correctamente");
      }).catch((error) => {
        toast.error("Hubo un problema al actualizar el producto" + error.message)
      })
    } else {
      toast.error("Error en la edición del producto")
    }
  };

  return (
    <div className="editprod d-flex justify-content-center p-5">
    <div className="d-flex justify-content-center bg-primary-subtle w-50">
      <form className="w-100 p-4 border round shadow" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center bg-primary-subtle">
          <h2>Editar Producto</h2>
        </div>
        <div className="d-flex justify-content-center m-2 w-100">
          <label className="form-label w-25">Nombre:</label>
          <input
            className="w-75"
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
            required
            />
        </div>
        <div className="d-flex justify-content-center m-2 w-100">
          <label className="form-label w-25">Descripción:</label>
          <textarea className="w-75"
            name="descripcion"
            value={producto.descripcion || ''}
            onChange={handleChange}
            required
            />
        </div>

        <div className="d-flex justify-content-center m-2 w-100">
          <label className="form-label w-25">URL de imagen:</label>
          <input 
            className="w-75"
            name="imagen"
            value={producto.imagen || ''}
            onChange={handleChange}
            required
            />
        </div>

        <div className="d-flex justify-content-center m-2 w-100">
          <label className="form-label w-25">Precio:</label>
          <input className="w-75"
            type="number"
            name="precio"
            value={producto.precio || ''}
            onChange={handleChange}
            required
            /*min="0"*/
            />
        </div>
        <div className="d-flex justify-content-center m-2">
          <button className="btn btn-primary w-50" type="submit">Actualizar Producto</button>
        </div>
        <ToastContainer/>
      </form>
    </div>
    </div>
  );
}

export default FormularioEdicion;
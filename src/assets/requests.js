export const agregarProducto = async (producto) => {

    return (
        new Promise ( async (res,rej) => {

            try {
                const respuesta = await fetch('https://6828fe116075e87073a57d70.mockapi.io/api/v1/articles', {
                    method:'POST',
                    headers: { 'Content-Type':'application/json',},
                    body: JSON.stringify(producto),        
                });
            
                if (!respuesta.ok) {
                    throw new Error ("Error al agregar el producto");
                }
            
                const data = await respuesta.json();
                //console.log("Producto agregado:", data);
                //alert("Producto agregado correctamente");
                res(data)

            } catch (error) {
                //console.error(error.message);
                //alert("Hubo un problema al agregar el producto");
                rej(error.message)
            }
        }
    ))
};

export const eliminarProducto = (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (confirmar) {
        return (
            new Promise (async (res,rej) => {
                try {
                    const respuesta = await fetch(`https://mockapi.io/api/v1/productos/${id}`, {
                    method: 'DELETE',
                    });
                    if (!respuesta.ok) throw new Error('Error al eliminar');
                    alert('Producto eliminado correctamente.');
                    res()
                } catch (error) {
                    console.error(error.message);
                    alert('Hubo un problema al eliminar el producto.');
                    rej()
                }
            })
        )
    }
};
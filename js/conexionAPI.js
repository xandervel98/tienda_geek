async function listarProductos(){
    const conexion = await fetch("https://673cbbdf96b8dcd5f3fb58a5.mockapi.io/productos");

    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function enviarProductos(nombre,precio,imagen,id){
    const conexion = await fetch("https://673cbbdf96b8dcd5f3fb58a5.mockapi.io/productos",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen,
            id:id
        })
    })
    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`https://673cbbdf96b8dcd5f3fb58a5.mockapi.io/productos/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el producto");
        }

        const respuestaConvertida = await respuesta.json(); 

        return respuestaConvertida; 
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

async function actualizarProducto(id, datos) {
    const respuesta = await fetch(`https://673cbbdf96b8dcd5f3fb58a5.mockapi.io/productos/${id}`, {
        method: "PUT", // Puedes usar PATCH si solo quieres actualizar campos específicos
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto");
    }

    return await respuesta.json();
}

export const conexionAPI={
    listarProductos,enviarProductos, eliminarProducto, actualizarProducto
}
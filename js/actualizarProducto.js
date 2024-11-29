import { conexionAPI } from "./conexionAPI.js";

export async function actualizarProducto(evento) {
    evento.preventDefault();

    const idProducto = evento.target.getAttribute("data-id");
    console.log("ID del producto a actualizar:", idProducto);

    if (!idProducto) {
        console.error("No se encontró el ID del producto a actualizar.");
        return;
    }

    const nombreActualizado = document.querySelector("[data-nombre2]").value.trim();
    const precioActualizado = document.querySelector("[data-precio2]").value.trim();
    const imagenActualizada = document.querySelector("[data-imagen2]").value.trim();

    if (!nombreActualizado || !precioActualizado || !imagenActualizada) {
        alert("Por favor, completa todos los campos para actualizar el producto.");
        return;
    }

    if (isNaN(precioActualizado) || Number(precioActualizado) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return;
    }

    try {
        // Llamada a la API usando PUT para actualizar el producto
        const productoActualizado = await conexionAPI.actualizarProducto(idProducto, {
            nombre: nombreActualizado,
            precio: precioActualizado,
            imagen: imagenActualizada
        });

        // Actualizar la card en el DOM
        const productoCard = document.querySelector(`[data-edit="${idProducto}"]`).closest(".card");
        if (productoCard) {
            productoCard.querySelector(".nombre__producto").textContent = productoActualizado.nombre;
            productoCard.querySelector(".precio__producto").textContent = `$ ${productoActualizado.precio}`;
            productoCard.querySelector(".productos__imagen").src = productoActualizado.imagen;
        }

        alert("Producto actualizado exitosamente.");
        document.getElementById("modal-editar").style.display = "none";

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Hubo un problema al actualizar el producto. Inténtalo de nuevo.");
    }
}

// Agregar evento al formulario de edición
document.getElementById("form-editar-producto").addEventListener("submit", actualizarProducto);

// Evento para cerrar el modal
document.getElementById("cerrar-modal").addEventListener("click", () => {
    document.getElementById("modal-editar").style.display = "none";
});
import { conexionAPI } from "./conexionAPI.js";
import crearCard from "./mostrarProductos.js";

const boton_enviar = document.querySelector("[data-enviar]");
const boton_limpiar = document.querySelector("[data-limpiar]");

async function crearProducto(evento){

    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value.trim();
    const imagen = document.querySelector("[data-imagen]").value.trim();

    if (!nombre || !precio || !imagen) {
        alert("Por favor, completa todos los campos antes de registrar un producto.");
        return;
    }

    if (isNaN(precio) || Number(precio) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return;
    }

    try {
        const nuevoProducto = await conexionAPI.enviarProductos(nombre, precio, imagen);

        const lista = document.querySelector("[data-lista]");
        lista.appendChild(crearCard(nuevoProducto.nombre, nuevoProducto.precio, nuevoProducto.imagen, nuevoProducto.id));
        alert("Producto registrado exitosamente.");
        limpiarFormulario();

    } catch (error) {
        console.error("Error al registrar el producto:", error);
        alert("Hubo un problema al registrar el producto. Inténtalo de nuevo.");
    }

    
}

async function limpiarFormulario(evento) {

    evento.preventDefault();
    
    const inputs = document.querySelectorAll("[data-nombre], [data-precio], [data-imagen]");
    
    inputs.forEach(input => input.value = '');
}

boton_enviar.addEventListener("click",evento => crearProducto(evento));
boton_limpiar.addEventListener("click", (evento) => limpiarFormulario(evento));
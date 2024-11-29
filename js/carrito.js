import { conexionAPI } from "./conexionAPI.js";

const carrito = document.querySelector("[data-carrito]");
const carritoLista = document.querySelector("[data-carrito-lista]");
const carritoTotal = document.querySelector("[data-carrito-total]");
const limpiarCarrito = document.querySelector("[data-limpiar-carrito]");
const carritoContador = document.querySelector("[data-carrito-contador]");

let productosCarrito = [];
let totalCarrito = 0;

export async function agregarAlCarrito(id) {
    try {
        const productos = await conexionAPI.listarProductos();
        const producto = productos.find(item => item.id === id);

        if (!producto) {
            console.error("Producto no encontrado.");
            return;
        }

        const productoExistente = productosCarrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            productosCarrito.push({ ...producto, cantidad: 1 });
        }

        actualizarCarrito();
        actualizarContadorCarrito();

        if (!carrito.classList.contains("visible")) {
            carrito.classList.add("visible");
        }

    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
    }
}

function actualizarCarrito() {
    carritoLista.innerHTML = "";
    totalCarrito = 0;

    productosCarrito.forEach(producto => {
        const li = document.createElement("li");
        li.className = "elemento__carrito";
        
        const imagenMiniatura = document.createElement("img");
        imagenMiniatura.src = producto.imagen;
        imagenMiniatura.alt = producto.nombre;
        imagenMiniatura.className = "carrito__imagen";

        const textoProducto = document.createElement("span");
        textoProducto.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        textoProducto.className = "carrito__texto";

        const botonEliminar = document.createElement("img");
        botonEliminar.src = "./assets/delete_icon.png";
        botonEliminar.className = "carrito__eliminar";
        botonEliminar.setAttribute = "data-carrito-eliminar"
        botonEliminar.addEventListener("click", () => eliminarProducto(producto.id));

        li.appendChild(imagenMiniatura);
        li.appendChild(textoProducto);
        li.appendChild(botonEliminar);

        carritoLista.appendChild(li);

        totalCarrito += producto.precio * producto.cantidad;
    });

    carritoTotal.textContent = totalCarrito.toFixed(2);
}

function eliminarProducto(id) {
    productosCarrito = productosCarrito.filter(producto => producto.id !== id);
    actualizarCarrito();
    actualizarContadorCarrito();
}

limpiarCarrito.addEventListener("click", () => {
    productosCarrito = [];
    actualizarCarrito();
    actualizarContadorCarrito();
});

function actualizarContadorCarrito() {
    const totalProductos = productosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    carritoContador.textContent = totalProductos;
}

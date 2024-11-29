const carrito = document.querySelector("[data-carrito]");
const toggleCarritoBtn = document.querySelector("#toggle-carrito");
const limpiarCarritoBtn = document.querySelector("[data-limpiar-carrito]");

toggleCarritoBtn.addEventListener("click", () => {
        carrito.classList.toggle("visible");
});

limpiarCarritoBtn.addEventListener("click", () => {
    const listaCarrito = document.querySelector("[data-carrito-lista]");
    listaCarrito.innerHTML = ""; 
    const totalCarrito = document.querySelector("[data-carrito-total]");
    totalCarrito.textContent = "0.00";
});

document.addEventListener("click", (evento) => {
    if (
        !carrito.contains(evento.target) &&
        !toggleCarritoBtn.contains(evento.target) &&
        !evento.target.matches("[data-agregar]") &&
        !evento.target.matches(".carrito__eliminar")
    ) {
        carrito.classList.remove("visible");
    }
});

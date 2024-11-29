function buscarEnCards() {
    const query = buscarInput.value.trim().toLowerCase(); // Texto ingresado por el usuario

    const cards = document.querySelectorAll(".card"); // Seleccionar todas las cards creadas

    let resultadosEncontrados = false;

    cards.forEach(card => {
        const nombreProducto = card.querySelector("p").textContent.toLowerCase(); // Obtener el nombre del producto desde la card

        if (nombreProducto.includes(query)) {
            card.style.display = "flex"; // Mostrar la card si coincide
            resultadosEncontrados = true;
        } else {
            card.style.display = "none"; // Ocultar la card si no coincide
        }
    });

    // Mostrar mensaje si no se encontraron resultados
    if (!resultadosEncontrados) {
        lista.innerHTML += `<p id="sin-resultados">No se encontraron productos con "${query}".</p>`;
    } else {
        const mensaje = document.getElementById("sin-resultados");
        if (mensaje) mensaje.remove(); // Eliminar el mensaje si hay resultados
    }
}

const buscarInput = document.getElementById("buscar-producto"); // Campo de búsqueda
buscarInput.addEventListener("input", buscarEnCards);


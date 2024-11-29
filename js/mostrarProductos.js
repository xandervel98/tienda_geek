import { conexionAPI } from "./conexionAPI.js";
import { agregarAlCarrito } from "./carrito.js";

const lista = document.querySelector("[data-lista]")

export default function crearCard(nombre,precio,imagen,id){
    const producto = document.createElement("div");
    producto.className = "card";
    producto.innerHTML = `<img class="productos__imagen" src="${imagen}" />
                    <div class="card-container--info">
                      <div>
                        <p class="nombre__producto">${nombre}</p>
                      </div>
                      <div class="card-container--value">
                        <p class="precio__producto">$ ${precio}</p>
                        <div>
                          <img class="btn__editar" src="./assets/edit_icon.png" data-edit="${id}"/>
                          <img class="btn__eliminar" src="./assets/trash_icon.png" data-delete="${id}"/>
                        </div>
                      </div>
                      <div>
                        <button class="btn__agregar" data-agregar="${id}">Agregar al carrito</button>
                      </div>
                    </div>`

    producto.querySelector(`[data-agregar="${id}"]`).addEventListener("click", () => {
    agregarAlCarrito(id);
    });


    return producto;
}

async function listarProductos(){
    try{
        const listaAPI = await conexionAPI.listarProductos()

        listaAPI.forEach(producto=>lista.appendChild(crearCard(producto.nombre,producto.precio,producto.imagen, producto.id)))

        // Asignar eventos a los botones de editar después de generar las tarjetas
        const botonesEditar = lista.querySelectorAll("[data-edit]");
        botonesEditar.forEach(boton => {
            boton.addEventListener("click", editarProducto); // Aquí llamamos a la función para mostrar el modal
        });

         const botonesEliminar = lista.querySelectorAll("[data-delete]");
         botonesEliminar.forEach(boton => {
             boton.addEventListener("click", eliminarProducto);
         });

    }catch{
        lista.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexion :( </h2>`;
    }
    
}

async function eliminarProducto(evento) {
  const idProducto = evento.target.getAttribute("data-delete");

  if (!idProducto) return;

  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (!confirmacion) {
      return;
  }

  try {

      await conexionAPI.eliminarProducto(idProducto);

      const productoEliminado = evento.target.closest(".card");
      lista.removeChild(productoEliminado);
      alert("Se ha eliminado el producto.");
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
  }
}

async function editarProducto(evento) {
  const idProducto = evento.target.getAttribute("data-edit");

  if (!idProducto) return;

  // Obtener productos de la API
  const productos = await conexionAPI.listarProductos();
  const producto = productos.find(p => p.id === idProducto);

  console.log("Producto seleccionado:", producto); // Depuración

  if (producto) {
      // Rellenar los campos del formulario con los datos del producto seleccionado
      document.querySelector("[data-nombre2]").value = producto.nombre || '';
      document.querySelector("[data-precio2]").value = producto.precio || '';
      document.querySelector("[data-imagen2]").value = producto.imagen || '';

      // Mostrar el modal
      const modal = document.getElementById("modal-editar");
      if (modal) {
          modal.style.display = "flex"; // Cambiar a flex para mostrar el modal
      }

      // Agregar el ID del producto al formulario
      const formActualizar = document.getElementById("form-editar-producto");
      formActualizar.setAttribute("data-id", idProducto);
  }
}

// Evento para cerrar el modal
document.getElementById("cerrar-modal").addEventListener("click", () => {
  const modal = document.getElementById("modal-editar");
  if (modal) {
      modal.style.display = "none"; // Ocultar el modal
  }
});


listarProductos()


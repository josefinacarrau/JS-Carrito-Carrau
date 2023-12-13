document.addEventListener("DOMContentLoaded", function () {
  let articulosCarrito = [];

  const listaProgramas = document.querySelector("#listaProgramas");
  const contenedorCarrito = document.querySelector("#listaCarrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");
  const comprarCarrito = document.querySelector("#comprarCarrito");

  // Introduce el archivo JSON
  fetch("../programas.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data.programas)) {
        listaProgramas.addEventListener("click", function (evt) {
          agregarProducto(evt, data.programas, leerDatosProgramas);
        });
      } else {
        console.error(
          "La propiedad programas no es un arreglo o no está definida en el JSON."
        );
      }
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));

  function agregarProducto(evt, programas, leerDatosProgramas) {
    if (evt.target.classList.contains("btnPrograma")) {
      const programa = evt.target.closest(".box").dataset.programa;
      const programaSeleccionado = programas.find((p) => p.nombre === programa);
      if (programaSeleccionado) {
        leerDatosProgramas(programaSeleccionado);
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
  console.log(evt.target.classList.contains("btnPrograma"));

  function leerDatosProgramas(programa) {
    const idPrograma = articulosCarrito.length + 1;
    const nombrePrograma = programa.nombre;
    const precioPrograma = programa.subProductos[0].precio;

    const infoPrograma = {
      id: idPrograma,
      imagen: "../img/no_image.png",
      nombre: nombrePrograma,
      precio: precioPrograma,
      cantidad: 1,
    };

    const programaExistenteIndex = articulosCarrito.findIndex(
      (prod) => prod.id === infoPrograma.id
    );

    if (programaExistenteIndex !== -1) {
      articulosCarrito[programaExistenteIndex].cantidad += 1;
    } else {
      articulosCarrito.push(infoPrograma);
    }

    dibujarCarritoHTML();
  }

  function dibujarCarritoHTML() {
    limpiarCarrito();

    articulosCarrito.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
              <td><img src="${producto.imagen}" width="100" /></td>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>${producto.cantidad}</td>
              <td><a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
            `;
      contenedorCarrito.appendChild(fila);
    });

    sincronizarStorage();
    calcularTotalCarrito();
  }

  function limpiarCarrito() {
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
  }

  function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
    calcularTotalCarrito();
    Swal.fire({
      icon: "success",
      title: "¡Carrito vaciado!",
      text: "El carrito fue vaciado con éxito.",
    });
  }

  comprarCarrito.addEventListener("click", function () {
    if (articulosCarrito.length > 0) {
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Carrito vacío!",
        text: "Agrega productos antes de comprar.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
  }

  window.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    dibujarCarritoHTML();
  });

  function eliminarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("borrar-producto")) {
      const idProducto = parseInt(evt.target.getAttribute("data-id"));

      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== idProducto
      );

      dibujarCarritoHTML();
    }
  }

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  contenedorCarrito.addEventListener("click", eliminarProducto);

  function calcularTotalCarrito() {
    let total = 0;

    articulosCarrito.forEach((producto) => {
      const precioNumerico = parseFloat(
        producto.precio.replace(" UYU", "").replace(",", "")
      );

      if (!isNaN(precioNumerico)) {
        total += precioNumerico * producto.cantidad;
      }
    });

    const totalCarritoElement = document.getElementById("totalCarrito");

    if (totalCarritoElement) {
      totalCarritoElement.innerHTML = `<p><strong>Total: $${total.toFixed(
        2
      )} UYU</strong></p>`;
    }

    return total;
  }

  calcularTotalCarrito();
});

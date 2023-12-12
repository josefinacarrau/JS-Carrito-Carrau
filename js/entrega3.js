// Función para cambiar la imagen de un elemento
function cambiarImagen(elemento, src, alt) {
  elemento.setAttribute("src", src);
  elemento.setAttribute("alt", alt);
}

// Function to handle color box click
function handleColorBoxClick(colorBox, imgElement, src, alt) {
  colorBox.addEventListener("click", function () {
    cambiarImagen(imgElement, src, alt);
  });
}

// Grip product
let productGripImg = document.getElementById("productGrip");

handleColorBoxClick(
  document.querySelector(".verde"),
  productGripImg,
  "../img/GripVerde.jpg",
  "Grip Verde"
);
handleColorBoxClick(
  document.querySelector(".azul"),
  productGripImg,
  "../img/GripAzul.jpg",
  "Grip Azul"
);
handleColorBoxClick(
  document.querySelector(".rojo"),
  productGripImg,
  "../img/GripRojo.jpg",
  "Grip Rojo"
);
handleColorBoxClick(
  document.querySelector(".amarillo"),
  productGripImg,
  "../img/GripAmarillo.jpg",
  "Grip Amarillo"
);

// Guantes product
let productGuanteImg = document.getElementById("productGuante");

handleColorBoxClick(
  document.querySelector(".aqua"),
  productGuanteImg,
  "../img/GuanteAqua.jpg",
  "Guante Aqua"
);
handleColorBoxClick(
  document.querySelector(".fuchsia"),
  productGuanteImg,
  "../img/GuanteFucsia.jpg",
  "Guante Fucsia"
);
handleColorBoxClick(
  document.querySelector(".negro"),
  productGuanteImg,
  "../img/GuanteNegro.jpg",
  "Guante Negro"
);

// Tabla product
let productTablaImg = document.getElementById("productTabla");

handleColorBoxClick(
  document.querySelector(".blanca"),
  productTablaImg,
  "../img/TablaEntrenadorBlanca.jpg",
  "Tabla Entrenador Blanca"
);
handleColorBoxClick(
  document.querySelector(".fuchsia2"),
  productTablaImg,
  "../img/TablaEntrenadorFucsia.jpg",
  "Tabla Entrenador Fucsia"
);
handleColorBoxClick(
  document.querySelector(".verde2"),
  productTablaImg,
  "../img/TablaEntrenadorVerde.jpg",
  "Tabla Entrenador Verde"
);

//------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  let articulosCarrito = [];

  const listaAccesorios = document.querySelector("#listaAccesorios");
  const contenedorCarrito = document.querySelector("#listaCarrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");
  const comprarCarrito = document.querySelector("#comprarCarrito");
  const carrito = document.querySelector("#carrito");

  // Introduzco el archivo JSON
  fetch("../programas.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Verificar si la propiedad "programas" existe y es un arreglo
      if (Array.isArray(data.programas)) {
        listaAccesorios.addEventListener("click", function (evt) {
          agregarProducto(evt, data.programas);
        });
      } else {
        console.error(
          "La propiedad programas no es un arreglo o no está definida en el JSON."
        );
      }
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));

  function agregarProducto(evt, programas) {
    if (evt.target.classList.contains("btnArticulo")) {
      const producto = evt.target.closest(".cardProductos");
      leerDatosProducto(producto, programas);
    }
  }

  function leerDatosProducto(item, programas) {
    const imgProducto = item.querySelector(".imgProducto");
    const infoProducto = {
      imagen: imgProducto ? imgProducto.src : "../img/no_image.png",
      nombre: item.querySelector("h3").textContent,
      precio: item.querySelector(".price").textContent,
      id: item.querySelector("button").getAttribute("data-id"),
      cantidad: 1,
    };
    const productoExistenteIndex = articulosCarrito.findIndex(
      (prod) => prod.id === infoProducto.id
    );

    if (productoExistenteIndex !== -1) {
      // Si el producto ya existe en el carrito, simplemente incrementa la cantidad en 1
      articulosCarrito[productoExistenteIndex].cantidad += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad inicial de 1
      articulosCarrito.push(infoProducto);
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
      text: "El carrito fue vaciado con exito.",
    });
  }

  /*   vaciarCarritoBtn.addEventListener("click", function () {
    if (articulosCarrito.length == 0) {
      Swal.fire({
        icon: "success",
        title: "¡Carrito vaciado!",
        text: "El carrito fue vaciado con exito.",
      });
    }
  }); */

  comprarCarrito.addEventListener("click", function () {
    if (articulosCarrito.length > 0) {
      // Si el carrito tiene productos, mostrar alerta de compra realizada con éxito
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada con éxito!",
        text: "Gracias por tu compra.",
      });
    } else {
      // Si el carrito está vacío, mostrar alerta de carrito vacío
      Swal.fire({
        icon: "warning",
        title: "¡Carrito vacío!",
        text: "Agrega productos al carrito antes de comprar.",
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

  listaAccesorios.addEventListener("click", agregarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  contenedorCarrito.addEventListener("click", eliminarProducto);

  function calcularTotalCarrito() {
    let total = 0;

    // Iterar sobre los productos en el carrito y sumar el precio total
    articulosCarrito.forEach((producto) => {
      // Asegurarse de que el precio sea un número antes de sumarlo
      const precioNumerico = parseFloat(
        producto.precio.replace("$", "").replace(",", "")
      );

      if (!isNaN(precioNumerico)) {
        total += precioNumerico * producto.cantidad;
      }
    });

    // Mostrar el total en algún lugar, por ejemplo, en un elemento con id "totalCarrito"
    const totalCarritoElement = document.getElementById("totalCarrito");

    if (totalCarritoElement) {
      totalCarritoElement.innerHTML = `<p><strong>Total: $${total.toFixed(
        2
      )}</strong></p>`;
    }

    return total;
  }

  // Llamada a la función para calcular el total inicial al cargar la página
  calcularTotalCarrito();
  function eliminarProducto(evt) {
    if (evt.target.classList.contains("borrar-producto")) {
      const idProducto = evt.target.getAttribute("data-id");

      // Filtrar los productos del carrito para excluir el que se va a eliminar
      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== idProducto
      );

      dibujarCarritoHTML();
    }
  }
});

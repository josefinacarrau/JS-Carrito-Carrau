//------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  let articulosCarrito = [];

  // Introduzco archivo JSON
  fetch("../js/articulos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      cargarAccesorios(data);
    })
    .catch((error) => {
      console.error(error);
    });

  const contenedorAccesorios = document.querySelector("#contenedorAccesorios");
  let botonesAgregar = document.querySelectorAll(".btnArticulo");
  const contenedorCarrito = document.querySelector("#listaCarrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");
  const comprarCarrito = document.querySelector("#comprarCarrito");

  function cargarAccesorios(articulosSeleccionados) {
    contenedorAccesorios.innerHTML = "";
    articulosSeleccionados.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("col-xl-3", "col-md-3", "col-sm-6");
      div.innerHTML = `
        <div class="cardProductos">
          <img src="${obtenerImagen(producto)}" alt="${
        producto.titulo
      }" class="card-img-top imgProducto" id="productGrip"/>
          <div class="cardBody">
            <h3 class="h3Carrito">${producto.titulo}</h3>
            <div class="contenedorColores">
              ${generarColores(producto.imagen)}
            </div>
            <p class="price">$${producto.precio}</p>
            <button class="btn btnCarrito btnArticulo" data-id="${
              producto.id
            }">Agregar al carrito</button>
          </div>
        </div>
      `;
      contenedorAccesorios.appendChild(div);
    });
    actualizarBotonesAgregar();
  }

  function obtenerImagen(producto) {
    if (producto.id === 1 || producto.id === 3 || producto.id === 5) {
      // Artículos con id 1, 3 o 5 tienen una estructura de imagen diferente
      const primerColor = Object.keys(producto.imagen)[0];
      return producto.imagen[primerColor];
    } else if (producto.imagen instanceof Object) {
      // Si la imagen es un objeto y no es un artículo especial, obtenemos la primera propiedad como la imagen
      const primerColor = Object.keys(producto.imagen)[0];
      return producto.imagen[primerColor];
    } else {
      // Si la imagen no es un objeto, simplemente devolvemos la ruta de la imagen
      return producto.imagen;
    }
  }

  function generarColores(imagenes) {
    if (imagenes instanceof Object) {
      return Object.keys(imagenes)
        .map((color) => `<div class="colorBox ${color.toLowerCase()}"></div>`)
        .join("");
    } else {
      return "";
    }
  }

  function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".btnArticulo");

    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", agregarProducto);
    });
  }

  contenedorAccesorios.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("btnArticulo")) {
      agregarProducto(evt);
    }
  });

  function agregarProducto(evt) {
    evt.stopPropagation(); // Evita la propagación del evento para que no se dispare en el contenedorAccesorios
    const producto = evt.target.closest(".cardProductos");
    leerDatosAccesorio(producto);
  }

  function leerDatosAccesorio(item) {
    const imgProducto = item.querySelector(".imgProducto");
    const infoProducto = {
      imagen: imgProducto ? imgProducto.src : "./img/no_image.png",
      titulo: item.querySelector("h3").textContent,
      precio: item.querySelector(".price").textContent,
      id: String(item.querySelector("button").getAttribute("data-id")), // Convertir a cadena
      cantidad: 1,
    };

    const productoExistenteIndex = articulosCarrito.findIndex(
      (prod) => prod.id === infoProducto.id
    );

    if (productoExistenteIndex !== -1) {
      articulosCarrito[productoExistenteIndex].cantidad += 1;
    } else {
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
        <td>${producto.titulo}</td>
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

  // Evento de Vaciar Carrito, dispara un SweetAlert
  vaciarCarritoBtn.addEventListener("click", popUpVaciarCarrito);

  function popUpVaciarCarrito() {
    if (articulosCarrito.length === 0) {
      // If the cart is already empty, show a warning alert
      Swal.fire({
        title: "¡Atención!",
        text: "El carrito ya está vacío.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    } else {
      // If there are items in the cart, show the confirmation alert
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Tenés productos en el carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Carrito vaciado",
            text: "Se eliminaron los productos del carrito.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              function vaciarCarrito() {
                while (contenedorCarrito.firstChild) {
                  contenedorCarrito.removeChild(contenedorCarrito.firstChild);
                }
                articulosCarrito = [];
                sincronizarStorage();
                calcularTotalCarrito();
              }
              vaciarCarrito();
            }
          });
        } else {
          // No es necesario manejar el caso de "Cancelar" aquí.
        }
      });
    }
  }

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

  function eliminarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("borrar-producto")) {
      const idProducto = evt.target.getAttribute("data-id");

      const productoIndex = articulosCarrito.findIndex(
        (producto) => producto.id === idProducto
      );

      if (productoIndex !== -1) {
        if (articulosCarrito[productoIndex].cantidad > 1) {
          articulosCarrito[productoIndex].cantidad -= 1;
        } else {
          articulosCarrito.splice(productoIndex, 1);
        }
      }

      dibujarCarritoHTML();
    }
  }

  //contenedorAccesorios.addEventListener("click", agregarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  contenedorCarrito.addEventListener("click", eliminarProducto);

  function calcularTotalCarrito() {
    let total = 0;

    // Iterar sobre los productos en el carrito y sumar el precio total
    articulosCarrito.forEach((producto) => {
      // Asegurarse de que el precio sea un número antes de sumarlo
      const precioNumerico = parseFloat(
        String(producto.precio).replace("$", "").replace(",", "")
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
});

//-------------------------------------------------------------------------------------
//MODIFICACION DE IMAGENES SEGUN COLOR SELECCIONADO
// Función para cambiar la imagen de un elemento
function cambiarImagen(elemento, src, alt) {
  elemento.setAttribute("src", src);
  elemento.setAttribute("alt", alt);
}

// Function to handle color box click
function handleColorBoxClick(colorBox, imgElement, productData, color) {
  colorBox.addEventListener("click", function () {
    const colorImage = productData.imagen[color.toLowerCase()];
    cambiarImagen(imgElement, colorImage, `${productData.titulo} ${color}`);
  });
}

// Other color box click functions remain unchanged...

// Grip product
let productGripImg = document.getElementById("productGrip");
let gripProductData = articulosCarrito.find((product) => product.id === 1);

handleColorBoxClick(
  document.querySelector(".verde"),
  productGripImg,
  gripProductData,
  "Verde"
);
handleColorBoxClick(
  document.querySelector(".azul"),
  productGripImg,
  gripProductData,
  "Azul"
);
handleColorBoxClick(
  document.querySelector(".rojo"),
  productGripImg,
  gripProductData,
  "Rojo"
);
handleColorBoxClick(
  document.querySelector(".amarillo"),
  productGripImg,
  gripProductData,
  "Amarillo"
);

// Guantes product
let productGuanteImg = document.getElementById("productGuante");
let guanteProductData = articulosCarrito.find((product) => product.id === 3);

handleColorBoxClick(
  document.querySelector(".aqua"),
  productGuanteImg,
  guanteProductData,
  "Aqua"
);
handleColorBoxClick(
  document.querySelector(".fuchsia"),
  productGuanteImg,
  guanteProductData,
  "Fuchsia"
);
handleColorBoxClick(
  document.querySelector(".negro"),
  productGuanteImg,
  guanteProductData,
  "Negro"
);

// Tabla product
let productTablaImg = document.getElementById("productTabla");
let tablaProductData = articulosCarrito.find((product) => product.id === 5);

handleColorBoxClick(
  document.querySelector(".blanca"),
  productTablaImg,
  tablaProductData,
  "Blanca"
);
handleColorBoxClick(
  document.querySelector(".fuchsia2"),
  productTablaImg,
  tablaProductData,
  "Fuchsia"
);
handleColorBoxClick(
  document.querySelector(".verde2"),
  productTablaImg,
  tablaProductData,
  "Verde"
);

//---------------------------------------------------------------------------------
// DARK MODE

/* const botonDarkMode = document.querySelector("#darkColorMode");
const botonLightMode = document.querySelector("#lightMode");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");
let lightMode = localStorage.getItem("light-mode");

function activarDarkMode() {
  body.classList.add("dark-mode");
  body.classList.remove("light-mode"); // Remove light mode class
  localStorage.setItem("dark-mode", "activado");
  localStorage.removeItem("light-mode"); // Remove light mode from storage
}

function desactivarDarkMode() {
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  localStorage.setItem("light-mode", "activado");
  localStorage.removeItem("dark-mode"); // Remove dark mode from storage
}

botonDarkMode.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark-mode");
  activarDarkMode();
});

botonLightMode.addEventListener("click", () => {
  lightMode = localStorage.getItem("light-mode");
  desactivarDarkMode();
});

// Initial check for dark mode
if (darkMode === "activado") {
  activarDarkMode();
} else {
  desactivarDarkMode();
}
 */

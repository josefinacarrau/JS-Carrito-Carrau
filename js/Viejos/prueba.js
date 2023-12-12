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

const carrito = [];

function mostrarProductos() {
  const productosContainers = document.querySelectorAll(".box");

  productosContainers.forEach((productoContainer, index) => {
    const producto = {
      nombre: productoContainer
        .querySelector("h3.h3Carrito")
        .textContent.trim(),
      subProductos: [],
    };
    //console.log(productoContainer.querySelector("h3.h3Carrito").textContent.trim());

    const subProductosContainer = productoContainer.querySelectorAll(
      ".accordion-body .parent div"
    );

    //console.log(productoContainer.querySelectorAll(".accordion-body .parent2 div"));

    for (let i = 0; i < subProductosContainer.length; i += 4) {
      const subProducto = {
        nombre: subProductosContainer[i + 1].textContent.trim(),
        precio: parseFloat(
          subProductosContainer[i + 2].textContent
            .replace("UYU/hr", "")
            .replace("UYU/per", "")
            .trim()
        ),
        porHora: subProductosContainer[i + 2].textContent.includes("UYU/hr"),
      };

      producto.subProductos.push(subProducto);
    }

    const addToCartButtons = productoContainer.querySelectorAll(".btnCarrito");
    addToCartButtons.forEach((button, subIndex) => {
      button.addEventListener("click", function () {
        const subProducto = producto.subProductos[subIndex];
        agregarAlCarrito(subProducto);
      });
    });

    // Crear elementos HTML para mostrar el producto en la interfaz
    const productosContainer = document.getElementById("productos");
    const divProducto = document.createElement("div");
    divProducto.innerHTML = `
       <p>${producto.nombre}</p>
       <button class="addToCartBtn">Agregar al carrito</button>`;

    productosContainer.appendChild(divProducto);
  });
}

function calcularTotal() {
  let total = 0;
  carrito.forEach((item) => {
    if (item.porHora) {
      const horasContratadas = parseFloat(
        prompt(`Ingrese la cantidad de horas para ${item.nombre}:`)
      );
      total += item.precio * horasContratadas;
    } else {
      total += item.precio;
    }
  });
  return total;
}

function agregarAlCarrito(item) {
  carrito.push(item);

  const carritoElement = document.getElementById("carrito");
  const li = document.createElement("li");
  li.textContent = `${item.nombre} - Precio: ${
    item.porHora ? "$ por hora" : `$${item.precio}`
  }`;
  carritoElement.appendChild(li);
}

function main() {
  const seguirComprandoBtn = document.getElementById("seguirComprandoBtn");
  const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");

  mostrarProductos();

  seguirComprandoBtn.addEventListener("click", () => {
    // Puedes adaptar esta lógica según tus necesidades
    // Por ejemplo, mostrar un mensaje en lugar de usar un prompt
  });

  finalizarCompraBtn.addEventListener("click", () => {
    const total = calcularTotal();
    // ... (resto del código)
  });
}

main();

document.addEventListener("DOMContentLoaded", function () {
  let articulosCarrito = [];

  //const listaProgramas = document.querySelector("#listaProgramas");
  const listaAccesorios = document.querySelector("#listaAccesorios");
  const contenedorCarrito = document.querySelector("#listaCarrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");
  //const modificarCarrito = document.querySelector("#modificarCarrito");
  const carrito = document.querySelector("#carrito");

  function agregarProducto(evt) {
    if (evt.target.classList.contains("btnCarrito")) {
      //console.log(evt.target.classList.contains("btnCarrito"));
      const producto = evt.target.parentElement.parentElement;
      leerDatosProducto(producto);
    }
  }

  function leerDatosProducto(item) {
    const imgProducto = item.querySelector(".imgProducto");
    const infoProducto = {
      imagen: imgProducto ? imgProducto.src : "../img/no_image.png", //if..else (condition ? valueIfTrue:valeIfFalse)
      nombre: item.querySelector("h3").textContent,
      precio: item.querySelector(".price").textContent,
      id: item.querySelector("button").getAttribute("data-id"),
      cantidad: 1,
    };

    //console.log(infoProducto.precio);
    //console.log(typeof infoProducto.precio);
    //console.log(typeof infoProducto.cantidad);

    if (articulosCarrito.some((prod) => prod.id === infoProducto.id)) {
      //The some method stops iterating the array as soon as the callback returns true for any element.
      const productos = articulosCarrito.map((producto) => {
        //The map method creates a new array with the results of calling the provided function on every element in the calling array.
        if (producto.id === infoProducto.id) {
          let cantidad = parseInt(producto.cantidad);
          cantidad += 1;
          producto.cantidad = cantidad;
          return producto;
        } else {
          return producto;
        }
      });
      articulosCarrito = [...productos]; //... =spread - copia el array productos
    } else {
      articulosCarrito = [...articulosCarrito, infoProducto];
    }
    //console.log(articulosCarrito);
    dibujarCarritoHTML();
  }

  function dibujarCarritoHTML() {
    // Limpiar el contenido del carrito antes de dibujar
    limpiarCarrito();

    // Dibujar cada producto en el carrito
    articulosCarrito.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td><img src="${producto.imagen}" width="100" /></td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td> <a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
    `;
      contenedorCarrito.appendChild(fila);
    });
    //console.log(contenedorCarrito.appendChild(fila));

    // Sincronizar con el almacenamiento local
    sincronizarStorage();

    // Calcular y mostrar el total del carrito
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
  }

  function eliminarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("borrar-producto")) {
      const producto = evt.target.parentElement.parentElement;
      const productoId = producto.querySelector("a").getAttribute("data-id");
      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== productoId
      );
      dibujarCarritoHTML();
    }
  }

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

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
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
  };

  // Llamada a la función para calcular el total inicial al cargar la página
  calcularTotalCarrito();
});

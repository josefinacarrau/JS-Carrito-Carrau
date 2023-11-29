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

//---------------------------------------------------------------

/*   const productos = [
    {
      nombre: "Programas para niños",
      subProductos: [
        { nombre: "Guardería de hockey", precio: 1500, porHora: true },
        { nombre: "Escuela", precio: 22000, porHora: false },
        { nombre: "Cadetes", precio: 19500, porHora: false },
      ],
    },
    {
      nombre: "Programas para adultos",
      subProductos: [
        { nombre: "Básico", precio: 18500, porHora: true },
        { nombre: "Avanzadas", precio: 2500, porHora: true },
        { nombre: "Entrenamiento", precio: 20000, porHora: false },
      ],
    },
    {
      nombre: "Clases Privadas",
      subProductos: [
        { nombre: "Básico", precio: 20500, porHora: false },
        { nombre: "Avanzadas", precio: 2500, porHora: true },
      ],
    },
    {
      nombre: "Entrenamiento Alto Rendimeinto",
      subProductos: [
        { nombre: "Grupal", precio: 17500, porHora: false },
        { nombre: "Individual", precio: 20750, porHora: false },
      ],
    },
  ];

  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");

  // Mostrar productos en la interfaz
  const mostrarProductos = () => {
    const productosContainer = document.getElementById("productos");

    productos.forEach((producto) => {
      const divProducto = document.createElement("div");
      divProducto.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
        <button class="addToCartBtn" data-codigo="${producto.codigo}">Agregar al carrito</button>`;

      productosContainer.appendChild(divProducto);
    });

    // Attach click event to all buttons with class "addToCartBtn"
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const codigoProducto = this.getAttribute("data-codigo");
        agregarAlCarrito(codigoProducto);
      });
    });
  };

  // Agregar producto al carrito
  window.agregarAlCarrito = (codigo) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.codigo === codigo
    );

    const li = document.createElement("li");
    li.innerHTML = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio}`;

    listaCarrito.appendChild(li);

    // Calcular y mostrar el total
    calcularTotal();
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    let total = 0;
    const elementosCarrito = listaCarrito.getElementsByTagName("li");

    for (let i = 0; i < elementosCarrito.length; i++) {
      const precio = parseFloat(elementosCarrito[i].innerText.split("$")[1]);
      total += precio;
    }

    totalElemento.innerText = `Total: $${total.toFixed(2)}`;
  };

  // Inicializar la interfaz
  mostrarProductos();
 */

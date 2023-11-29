//Cambiar imagen al seleccionar color desado.
// Función para cambiar la imagen de un elemento
function cambiarImagen(elemento, src, alt) {
  elemento.setAttribute("src", src);
  elemento.setAttribute("alt", alt);
}

// Función para agregar eventos a los elementos
function agregarEvento(selector, imgElemento, src, alt) {
  document.querySelector(selector).addEventListener("click", function () {
    cambiarImagen(imgElemento, src, alt);
  });
}

// Imágenes de GRIP
let cambiarImgGrip = document.getElementById("productGrip");
agregarEvento(".verde", cambiarImgGrip, "../img/GripVerde.jpg", "Grip Verde");
agregarEvento(".azul", cambiarImgGrip, "../img/GripAzul.jpg", "Grip Azul");
agregarEvento(".rojo", cambiarImgGrip, "../img/GripRojo.jpg", "Grip Rojo");
agregarEvento(
  ".amarillo",
  cambiarImgGrip,
  "../img/GripAmarillo.jpg",
  "Grip Amarillo"
);

// Imágenes de GUANTE
let cambiarImgGuante = document.getElementById("productGuante");
agregarEvento(
  ".aqua",
  cambiarImgGuante,
  "../img/GuanteAqua.jpg",
  "Guante Aqua"
);
agregarEvento(
  ".fuchsia",
  cambiarImgGuante,
  "../img/GuanteFucsia.jpg",
  "Guante Fucsia"
);
agregarEvento(
  ".negro",
  cambiarImgGuante,
  "../img/GuanteNegro.jpg",
  "Guante Negro"
);

// Imágenes de TABLA
let cambiarImgTabla = document.getElementById("productTabla");
agregarEvento(
  ".blanca",
  cambiarImgTabla,
  "../img/TablaEntrenadorBlanca.jpg",
  "Tabla Entrenador Blanca"
);
agregarEvento(
  ".fuchsia2",
  cambiarImgTabla,
  "../img/TablaEntrenadorFucsia.jpg",
  "Tabla Entrenador Fucsia"
);
agregarEvento(
  ".verde2",
  cambiarImgTabla,
  "../img/TablaEntrenadorVerde.jpg",
  "Tabla Entrenador Verde"
);

//------------------------------------------------------------------------------------------------

let articulosCarrito = [];

//const listaProgramas = document.querySelector("#listaProgramas");
const listaAccesorios = document.querySelector("#listaAccesorios");
const contenedorCarrito = document.querySelector("#listaCarrito");
const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");
//const modificarCarrito = document.querySelector("#modificarCarrito");

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
    precio: parseFloat(item.querySelector(".price").textContent),
    id: item.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  if (articulosCarrito.some((prod) => prod.id === infoProducto.id)) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        let cantidad = parseInt(producto.cantidad);
        cantidad += 1;
        producto.cantidad = cantidad;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  dibujarCarritoHTML();
}

function dibujarCarritoHTML() {
  // Limpiar el contenido del carrito antes de dibujar
  limpiarCarrito();

  // Dibujar cada producto en el carrito
  articulosCarrito.forEach((producto) => {
    const fila = document.createElement("tr");
    // Verificar si producto.precio es un número antes de llamar a toFixed
    const precioFormateado =
      typeof producto.precio === "number"
        ? `$${producto.precio.toFixed(2)}`
        : "Precio no válido";

    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="100" /></td>
      <td>${producto.nombre}</td>
      <td>${precioFormateado}</td>
      <td>${producto.cantidad}</td>
      <td><a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
    `;

    contenedorCarrito.appendChild(fila);
  });
  // Sincronizar con el almacenamiento local
  sincronizarStorage();

  // Calcular y mostrar el total del carrito
  calcularTotal();
}

function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function vaciarCarrito() {
  limpiarCarrito();
  articulosCarrito = [];
  sincronizarStorage();
  calcularTotal();
}

function eliminarProducto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("borrar-producto")) {
    const productoId = evt.target.getAttribute("data-id");
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
const calcularTotal = () => {
  let total = 0;
  articulosCarrito.forEach((producto) => {
    if (typeof producto.precio === "number") {
      total += producto.precio * producto.cantidad;
    }
  });

  // Mostrar el total en algún elemento del HTML (debe estar definido en tu HTML)
  const totalElemento = document.getElementById("totalCarrito");
  if (totalElemento) {
    totalElemento.innerText = `Total: $${total.toFixed(2)}`;
  }
};

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

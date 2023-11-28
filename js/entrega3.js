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

//Codigo viejo misma funcion - cambiar las imagen con click en los colores
/* document.addEventListener("DOMContentLoaded", function () {
  // Obtener el elemento de la imagen GRIP por su ID
  let cambiarImgGrip = document.getElementById("productGrip");

  // GRIP a verde
  document.querySelector(".verde").addEventListener("click", function () {
    cambiarImagenGrip("../img/GripVerde.jpg", "Grip Verde");
  });

  // GRIP a azul
  document.querySelector(".azul").addEventListener("click", function () {
    cambiarImagenGrip("../img/GripAzul.jpg", "Grip Azul");
  });

  // GRIP a rojo
  document.querySelector(".rojo").addEventListener("click", function () {
    cambiarImagenGrip("../img/GripRojo.jpg", "Grip Rojo");
  });

  // GRIP a amarillo
  document.querySelector(".amarillo").addEventListener("click", function () {
    cambiarImagenGrip("../img/GripAmarillo.jpg", "Grip Amarillo");
  });

  // Obtener el elemento de la imagen GUANTE por su ID
  let cambiarImgGuante = document.getElementById("productGuante");

  // GUANTE a aqua
  document.querySelector(".aqua").addEventListener("click", function () {
    cambiarImagenGuante("../img/GuanteAqua.jpg", "Guante Aqua");
  });

  // GUANTE a fucsia
  document.querySelector(".fuchsia").addEventListener("click", function () {
    cambiarImagenGuante("../img/GuanteFucsia.jpg", "Guante Fucsia");
  });

  // GUANTE a negro
  document.querySelector(".negro").addEventListener("click", function () {
    cambiarImagenGuante("../img/GuanteNegro.jpg", "Guante Negro");
  });

  // Obtener el elemento de la imagen TABLA por su ID
  let cambiarImgTabla = document.getElementById("productTabla");

  // Tabla a blanca
  document.querySelector(".blanca").addEventListener("click", function () {
    cambiarImagenTabla(
      "../img/TablaEntrenadorBlanca.jpg",
      "Tabla Entrenador Blanca"
    );
  });

  // Tabla a fucsia
  document.querySelector(".fuchsia2").addEventListener("click", function () {
    cambiarImagenTabla(
      "../img/TablaEntrenadorFucsia.jpg",
      "Tabla Entrenador Fucsia"
    );
  });

  // Tabla a verde
  document.querySelector(".verde2").addEventListener("click", function () {
    cambiarImagenTabla(
      "../img/TablaEntrenadorVerde.jpg",
      "Tabla Entrenador Verde"
    );
  });

  // Función para cambiar la imagen GRIP
  function cambiarImagenGrip(src, alt) {
    cambiarImgGrip.setAttribute("src", src);
    cambiarImgGrip.setAttribute("alt", alt);
  }

  // Función para cambiar la imagen GUANTE
  function cambiarImagenGuante(src, alt) {
    cambiarImgGuante.setAttribute("src", src);
    cambiarImgGuante.setAttribute("alt", alt);
  }

  // Función para cambiar la imagen TABLA
  function cambiarImagenTabla(src, alt) {
    cambiarImgTabla.setAttribute("src", src);
    cambiarImgTabla.setAttribute("alt", alt);
  }
}); */

//------------------------------------------------------------------------------------------------

let articulosCarrito = [];

const listaProductos = document.querySelector("#listaProgramas");

const contenedorCarrito = document.querySelector("#listaCarrito tbody");

const vaciarCarritoBtn = document.querySelector("#vaciarCarrito");

const modificarCarrito = document.querySelector("#modificarCarrito");


function agregarProducto(evt) {
  if (evt.target.classList.contains("btnCarrito")) {
    const producto = evt.target.parentElement;
    leerDatosProducto(producto);
  }
}

function leerDatosProducto(item){
  const infoPrograma = {
    nombre : item.querySelector("nombre").textContent,
    precio : item.querySelector('precio').textContent,
    //horas : item.querySelector()
    id: item.querySelector("i").getAttribute("data-id"),
    cantidad: 1,
  };
  if (articulosCarrito.some((prod) => prod.id === infoPrograma.id)) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoPrograma.id) {
        let cantidad = parseInt(producto.cantidad);
        cantidad += 1;
        producto.cantidad = cantidad;
        return producto;
      } else {
        return producto;
      }
    });
    //articulosCarrito = productos.slice();
    articulosCarrito = [...productos];
  } else {
    //articulosCarrito.push(infoProducto);
    articulosCarrito = [...articulosCarrito, infoPrograma];
  }
  dibujarCarritoHTML();
}

function dibujarCarritoHTML() {
  limpiarCarrito();
  articulosCarrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        // <td><img src="${producto.imagen}" width="100" /></td>
        <td> ${producto.nombre}</td>
        <td> ${producto.precio}</td>
        <td> ${producto.cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}">❌</a>
        </td>
        `;
    contenedorCarrito.appendChild(fila);
  });
  sincronizarStorage();
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
}

function eliminarProducto(evt) {
  evt.preventDefault();
  //console.log(evt.target.classList.contains("borrar-producto"));
  if (evt.target.classList.contains("borrar-producto")) {
    const producto = evt.target.parentElement.parentElement;
    const productoId = producto.querySelector("a").getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    //console.log(producto);
    dibujarCarritoHTML();
  }
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

window.addEventListener("DOMContentLoaded", () => {
  //console.log("cargo el dom");
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  dibujarCarritoHTML();
});

listaProductos.addEventListener("click", agregarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
carrito.addEventListener("click", eliminarProducto);

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

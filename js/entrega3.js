document.addEventListener("DOMContentLoaded", function () {
  const productos = [
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
});
/* const productos = [
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
  
  console.log("Productos disponibles:");
  
  function mostrarProductos() {
    productos.forEach((producto, index) => {
      //Recorre cada producto del array productos
      console.log(`${index + 1}. ${producto.nombre}`); //Imprime cada producto con su indice - ${} se usa para concatenar en las mismas comillas entradas de js.
      producto.subProductos.forEach((subProducto, subIndex) => {
        //Recorre cada sub-producto
        console.log(
          //Imprime cada sub-producto con su correspondiente información
          `   ${index + 1}.${subIndex + 1} ${subProducto.nombre} - Precio: ${
            subProducto.porHora ? "$ por hora" : `$${subProducto.precio}` // If `porHora` is true, it displays "$ por hora"; otherwise, it displays the fixed price prefixed with "$".
          }`
        );
      });
    });
  }
  
  function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((item) => {
      if (item.porHora) {
        const horasContratadas = prompt(
          `Ingrese la cantidad de horas para ${item.nombre}:`
        );
        total += item.precio * parseFloat(horasContratadas);
      } else {
        total += item.precio;
      }
    });
    return total;
  }
  
  function main() {
    const carrito = [];
    let seguirComprando = true;
  
    while (seguirComprando) {
      mostrarProductos();
      const opcion = prompt(
        "Elija un producto por su número (0 para finalizar):"
      );
      const [numeroOpcion, subNumeroOpcion] = opcion.split(".").map(Number); //opcion.split("."): This part of the code splits the input string at the period (.) character. ["1", "2"]
      //.map(Number): This part of the code applies the Number function to each element of the array. This is used to convert the string elements into numbers. After this step, the array becomes [1, 2]
  
      if (
        numeroOpcion >= 1 &&
        numeroOpcion <= productos.length &&
        subNumeroOpcion >= 1 &&
        subNumeroOpcion <= productos[numeroOpcion - 1].subProductos.length //Since arrays in JavaScript are zero-indexed, subtracting 1 from the user input aligns it with the correct index in the array.
      ) {
        const productoElegido =
          productos[numeroOpcion - 1].subProductos[subNumeroOpcion - 1];
  
        if (productoElegido.porHora) {
          const horasContratadas = prompt(
            `Ingrese la cantidad de horas para ${productoElegido.nombre}:`
          );
          carrito.push({
            ...productoElegido,
            horasContratadas: parseFloat(horasContratadas),
          });
        } else {
          carrito.push(productoElegido);
        }
  
        console.log(`${productoElegido.nombre} ha sido añadido al carrito.`);
      } else if (numeroOpcion === 0) {
        seguirComprando = false;
      } else {
        console.log("Opción no válida. Intente de nuevo.");
      }
    }
  
    console.log("Carrito de compras:");
    carrito.forEach((item, index) => {
      if (item.porHora) {
        console.log(
          `${index + 1}. ${item.nombre} - Precio: $${item.precio}/hora - Horas: ${
            item.horasContratadas
          } - Total: $${item.precio * item.horasContratadas}`
        );
      } else {
        console.log(`${index + 1}. ${item.nombre} - Precio: $${item.precio}`);
      }
    });
  
    const total = calcularTotal(carrito);
    console.log(`Total: $${total.toFixed(2)}`);
  }
  
  main();
   */

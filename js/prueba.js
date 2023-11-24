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

  const mostrarProductos = () => {
    const productosContainer = document.getElementById("productos");

    productos.forEach((producto) => {
      const divProducto = document.createElement("div");
      divProducto.innerHTML = `
          <p>${producto.nombre} - $${producto.precio}</p>
          <button class="addToCartBtn" data-codigo="${producto.codigo}">Agregar al carrito</button>`;

      productosContainer.appendChild(divProducto);
    });

    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const codigoProducto = this.getAttribute("data-codigo");
        agregarAlCarrito(codigoProducto);
      });
    });
  };

  const agregarAlCarrito = (codigo) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.codigo === codigo
    );

    const li = document.createElement("li");
    li.innerHTML = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio}`;
    listaCarrito.appendChild(li);

    calcularTotal();
  };

  const calcularTotal = () => {
    let total = 0;
    const elementosCarrito = listaCarrito.getElementsByTagName("li");

    for (let i = 0; i < elementosCarrito.length; i++) {
      const precio = parseFloat(elementosCarrito[i].innerText.split("$")[1]);
      total += precio;
    }

    totalElemento.innerText = `Total: $${total.toFixed(2)}`;
  };

  mostrarProductos();
});
